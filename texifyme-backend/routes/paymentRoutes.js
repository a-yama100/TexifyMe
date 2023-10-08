// E:\programming\Project\TexifyMe\texifyme-backend\routes\paymentRoutes.js

const express = require('express');
const paymentController = require('../controllers/paymentController');

const router = express.Router();

router.post('/create-subscription', paymentController.createSubscription);

module.exports = router;
