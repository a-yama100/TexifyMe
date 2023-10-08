// E:\programming\Project\TexifyMe\texifyme-backend\routes\userRoutes.js

const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/auth');
const router = express.Router();

router.post('/', userController.createUser);
router.get('/:id', userController.getUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.post('/login', userController.login);
router.put('/settings/:id', userController.updateUserDetails);
router.get('/:id/dashboard', authMiddleware.verifyToken, userController.getDashboard);
router.get('/admin/dashboard', authMiddleware.verifyToken, authMiddleware.requireRole('admin'), userController.getAdminDashboard);
router.get('/:id/member-type', userController.getMemberTypes);

module.exports = router;
