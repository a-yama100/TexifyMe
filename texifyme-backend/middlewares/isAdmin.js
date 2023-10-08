// E:\programming\Project\TexifyMe\texifyme-backend\middlewares\isAdmin.js

const { User } = require('../models');

module.exports = async (req, res, next) => {
  if (!req.isAdmin) {
    return res.status(403).json({ error: 'Access denied. Not an admin.' });
  }
  try {
    const user = await User.findByPk(req.userId);  // userIdは認証から取得されるものと仮定
    if (!user.isAdmin) {
      return res.status(403).json({ error: 'Access denied. Not an admin.' });
    }
    next();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
