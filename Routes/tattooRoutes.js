// routes/tattooRoutes.js
const express = require('express');
const router = express.Router();
const tattooController = require('../Controllers/tattooController');

// Routes for tattoo bookings
router.post('/', tattooController.createTattoo);

router.get('/', tattooController.getAllTattoos);

router.get('/:id', tattooController.getTattooById);

router.put('/:id', tattooController.updateTattoo);

router.delete('/:id', tattooController.deleteTattoo);

module.exports = router;
