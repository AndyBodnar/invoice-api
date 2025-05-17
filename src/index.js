const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const clientRoutes = require('./routes/clients.routes');
const invoiceRoutes = require('./routes/invoices.routes');
const webhookRoutes = require('./routes/webhooks.routes');

app.use('/api/clients', clientRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/stripe-webhook', webhookRoutes);

app.get('/', (req, res) => res.send('Invoice API is alive cuhh'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ API running on port ${PORT}`));
