const express = require('express');
const router = express.Router();

// Stripe needs raw body for signature verification, so this is just a placeholder
router.post('/', (req, res) => {
  console.log('🔥 Received a webhook event (but not processing it yet)');
  res.status(200).send('Webhook received');
});

module.exports = router;
