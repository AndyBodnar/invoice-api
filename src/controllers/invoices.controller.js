const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create new invoice
exports.createInvoice = async (req, res) => {
  try {
    const invoice = await prisma.invoice.create({
      data: req.body,
    });
    res.status(201).json(invoice);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Get all invoices
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
