// E:\programming\Project\TexifyMe\texifyme-backend\controllers\adminController.js

const { User } = require('../models');

exports.getAdminDashboard = async (req, res) => {
  try {
    const users = await User.findAll();
    const totalUsers = users.length;

    // ここに他の集計情報を追加することができます

    res.status(200).json({ totalUsers, users });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
