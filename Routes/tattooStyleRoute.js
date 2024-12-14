const express = require('express');
const { createTattooStyle, getAllTattooStyles } = require('../Controllers/tattooStyleController');
const router = express.Router();

router.post('/addTattoo', createTattooStyle);
router.get('/getTattoo', getAllTattooStyles);

module.exports = router;
