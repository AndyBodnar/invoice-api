const express = require('express');
const router = express.Router();

// Make sure the folder is "controllers", not "controller"
const { createClient } = require('../controllers/clients.controller');

router.post('/', createClient);

module.exports = router;
