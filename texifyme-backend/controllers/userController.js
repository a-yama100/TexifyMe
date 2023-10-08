// E:\programming\Project\TexifyMe\texifyme-backend\controllers\userController.js

const { User, MemberTypes, ConversionHistory } = require('../models');  // MemberTypesのインポートを追加
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10

exports.createUser = async (req, res) => {
  try {
    // パスワードのハッシュ化
    const hashedPassword = await bcrypt.hash(req.body.password, SALT_ROUNDS);
    console.log("Hashed password:", hashedPassword);
    const user = await User.create({ ...req.body, password: hashedPassword });
    res.status(201).json(user);
  } catch (error) {
    // ここでエラーの種類に応じて異なるエラーメッセージを返す
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(409).json({ error: 'User with this email already exists.' });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    await user.update(req.body);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    await user.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Incorrect password.' });
    }

    const token = jwt.sign({ 
      id: user.id, 
      isAdmin: user.isAdmin, 
      role: user.role 
    }, 'your_secret_key', { expiresIn: '1h' });

    res.status(200).json({
      message: 'Logged in successfully',
      token,
      userId: user.id,
      isAdmin: user.isAdmin,
      role: user.role
    });

  } catch (error) {
    res.status(500).json({ error: 'Internal server error.' });
  }
};

exports.getDashboard = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { id: req.userId },
      include: [
        {
          model: ConversionHistory,
          as: 'histories'
        }
      ]
    });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateUserDetails = async (req, res) => {
  try {
    const userId = req.params.id;
    const { userId: newUserId, email, password } = req.body;

    // ユーザーの検索
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // ユーザー情報の更新
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    await user.update({ userId: newUserId, email, password: hashedPassword });
    res.status(200).json({ message: 'User details updated successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAdminDashboard = async (req, res) => {
  try {
    // ここで管理者ダッシュボードの情報を取得するロジックを実装
    res.status(200).json({ message: 'Admin dashboard data' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.changeMemberTypes = async (req, res) => {
  try {
    const userId = req.params.id;
    const { member_type_id } = req.body;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const memberTypeInstance = await MemberTypes.findByPk(member_type_id);
    if (!memberTypeInstance) {
      return res.status(404).json({ error: 'Member type not found' });
    }

    await user.update({ member_type_id });
    res.status(200).json({ message: 'Member type updated successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getMemberTypes = async (req, res) => {
  try {
      console.log("Starting getMemberTypes function...");  // <-- ログ追加
      const user = await User.findByPk(req.params.id);
      if (!user) {
          console.log("User not found error");  // <-- ログ追加
          return res.status(404).json({ error: 'User not found' });
      }
      if (!user.member_type_id) {
          console.log("Member type not set for this user error");  // <-- ログ追加
          return res.status(404).json({ error: 'Member type not set for this user' });
      }
      const memberTypeIdInstance = await MemberTypes.findByPk(user.member_type_id, {
        attributes: ['id', 'name', 'monthly_fee', 'max_uploads']  // この行を追加
      });
      if (!memberTypeIdInstance) {
          console.log("Member type not found error");  // <-- ログ追加
          return res.status(404).json({ error: 'Member type not found' });
      }
      console.log("Successfully retrieved member type:", memberTypeIdInstance.name);  // <-- ログ追加
      res.status(200).json({ MemberTypes: memberTypeIdInstance.name });
  } catch (error) {
      console.error("Error in getMemberTypes function:", error.message);  // <-- ログ追加
      res.status(400).json({ error: error.message });
  }
};
