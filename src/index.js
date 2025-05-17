const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const path = require('path');

// Load environment variables
dotenv.config();

const app = express();

// === Middleware ===
app.use(cors());
app.use(bodyParser.json());

// === Serve static PDF directory ===
app.use('/static/invoices', express.static(path.join(__dirname, '../invoices'))); // More reliable path resolution

// === Routes ===
app.use('/api/clients', require('./routes/clients.routes'));
app.use('/api/invoices', require('./routes/invoices.routes'));
app.use('/api/stripe-webhook', require('./routes/webhooks.routes'));

// === Root Endpoint (Health check) ===
app.get('/', (_req, res) => {
  res.send('🧾 Invoice API is alive, cuhh!');
});

// === Start server ===
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`✅ API running on http://localhost:${PORT}`);
});
