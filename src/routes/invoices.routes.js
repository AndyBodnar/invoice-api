const express = require('express');
const router = express.Router();
const {
  createInvoice,
  getInvoices
} = require('../controllers/invoices.controller');

router.post('/', createInvoice);
router.get('/', getInvoices);

module.exports = router;
