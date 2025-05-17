const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createClient = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const client = await prisma.client.create({
      data: { name, email, phone }
    });
    res.status(201).json(client);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create client' });
  }
};
