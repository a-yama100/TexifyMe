// E:\programming\Project\TexifyMe\texifyme-backend\routes\historyRoutes.js

const express = require('express');
const historyController = require('../controllers/historyController');

const router = express.Router();

router.post('/histories', historyController.createHistory);
router.get('/histories', historyController.getUserHistories);

module.exports = router;
