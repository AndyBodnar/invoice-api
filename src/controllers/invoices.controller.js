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
      amount,
      status,
      dueDate,
      stripeId,
      subtotal,
      taxRate,
      discount,
      total,
      lineItems = [] // default fallback to prevent Prisma crash
    } = req.body;

    // Create invoice
    const invoice = await prisma.invoice.create({
      data: {
        clientId,
        amount,
        status,
        dueDate,
        stripeId: stripeId || null,
        pdfUrl: null,
        lineItems,
        invoiceNo,
        subtotal: subtotal || 0,
        taxRate: taxRate || 0,
        discount: discount || 0,
        total: total || 0
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
