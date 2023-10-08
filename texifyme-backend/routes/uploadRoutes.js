// E:\programming\Project\TexifyMe\texifyme-backend\routes\uploadRoutes.js

const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController');

router.post('/convert', uploadController.uploadImage, uploadController.convertImageToLatex);

module.exports = router;
