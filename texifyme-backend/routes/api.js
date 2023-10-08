// E:\programming\Project\TexifyMe\texifyme-backend\routes\api.js

const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController');
const latexController = require('../controllers/latexController');

// Sample endpoint for testing
router.get('/test', (req, res) => {
    res.json({ message: 'API is working' });
});

router.post('/convert', uploadController.uploadImage, latexController.convertToLaTex);

module.exports = router;
