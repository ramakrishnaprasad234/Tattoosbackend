const express = require('express');
const { createContact, getContacts } = require('../controllers/Contectcont');

const router = express.Router();

// POST /contact - Save a new contact message
router.post('/contact', createContact);

// GET /contact - Fetch all contact messages (optional, for admin use)
router.get('/contact', getContacts);

module.exports = router;
