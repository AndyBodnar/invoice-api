const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const path = require('path');

// Load env variables
dotenv.config();

const app = express();

// === Middleware ===
app.use(cors());
app.use(bodyParser.json());

// === Serve static PDFs ===
app.use('/static/invoices', express.static(path.resolve('invoices')));

// === Routes ===
const clientRoutes = require('./routes/clients.routes');
const invoiceRoutes = require('./routes/invoices.routes');
const webhookRoutes = require('./routes/webhooks.routes');

app.use('/api/clients', clientRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/stripe-webhook', webhookRoutes);

// === Root health check ===
app.get('/', (req, res) => res.send('🧾 Invoice API is alive, cuhh!'));

// === Start server ===
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`✅ API running on port ${PORT}`));
