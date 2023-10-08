// E:\programming\Project\TexifyMe\texifyme-backend\syncModels.js

const { sequelize } = require('./models'); // あなたのモデルをインポートする正確なパスに変更してください。

async function syncModels() {
  try {
    await sequelize.sync(); // これにより、すべてのモデルがデータベースに同期されます。
    console.log('Models synchronized successfully.');
  } catch (error) {
    console.error('Error synchronizing models:', error);
  }
}

syncModels();
