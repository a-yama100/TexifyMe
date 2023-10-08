// E:\programming\Project\TexifyMe\texifyme-backend\routes\adminRoutes.js

const express = require('express');
const adminController = require('../controllers/adminController');
const isAdmin = require('../middlewares/isAdmin');

const router = express.Router();

router.get('/dashboard', isAdmin, adminController.getAdminDashboard);

module.exports = router;
