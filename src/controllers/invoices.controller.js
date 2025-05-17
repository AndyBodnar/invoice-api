const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const generateInvoiceHTML = require('../templates/invoice.template');

exports.createInvoice = async (req, res) => {
  try {
    // Count existing invoices to generate invoiceNo
    const invoiceCount = await prisma.invoice.count();
    const invoiceNo = `INV-${String(invoiceCount + 1).padStart(3, '0')}`;

    // Destructure with defaults
    const {
      clientId,
      paymentStatus,
      dueDate,
      stripeLink,
      subtotal,
      taxRate,
      discount,
      total,
      lineItems = []
    } = req.body;

    // Validate required fields
    if (!clientId || !dueDate || subtotal === undefined || total === undefined) {
      return res.status(400).json({ error: 'Missing required invoice fields' });
    }

    // Create invoice
    const invoice = await prisma.invoice.create({
      data: {
        clientId,
        paymentStatus: paymentStatus || 'draft',
        dueDate,
        stripeLink: stripeLink || null,
        pdfUrl: null,
        lineItems,
        invoiceNo,
        subtotal,
        taxRate: taxRate || 0,
        discount: discount || 0,
        total
      },
    });

    // Fetch client info
    const client = await prisma.client.findUnique({
      where: { id: invoice.clientId },
    });

    // Generate invoice HTML
    const html = generateInvoiceHTML({ client, invoice });

    // Render PDF with Puppeteer
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    await page.setContent(html);
    const pdfPath = path.resolve(`invoices/invoice-${invoice.id}.pdf`);
    await page.pdf({ path: pdfPath, format: 'A4' });
    await browser.close();

    // Update invoice with PDF path
    const updatedInvoice = await prisma.invoice.update({
      where: { id: invoice.id },
      data: { pdfUrl: pdfPath },
    });

    res.status(201).json(updatedInvoice);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

exports.getInvoices = async (req, res) => {
  try {
    const invoices = await prisma.invoice.findMany({
      include: { client: true },
    });
    res.json(invoices);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
