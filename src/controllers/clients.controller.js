const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create a new client
exports.createClient = async (req, res) => {
  try {
    const client = await prisma.client.create({
      data: req.body,
    });
    res.status(201).json(client);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Get all clients
exports.getClients = async (req, res) => {
  try {
    const clients = await prisma.client.findMany({
      include: { invoices: true },
    });
    res.json(clients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
