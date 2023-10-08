// E:\programming\Project\TexifyMe\texifyme-backend\controllers\uploadController.js

const multer = require('multer');
const axios = require('axios');
const ConversionHistory = require('../models/conversionhistory');  // モデルをインポート
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

exports.convertImageToLatex = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Image not provided' });
  }

  const imageBase64 = req.file.buffer.toString('base64');

  try {
    const response = await axios.post('https://api.mathpix.com/v3/text', {
      src: `data:image/jpeg;base64,${imageBase64}`
    }, {
      headers: {
        'App-ID': 'YOUR_MATHPIX_APP_ID',
        'App-Key': 'YOUR_MATHPIX_APP_KEY',
        'Content-Type': 'application/json'
      }
    });

    const latex = response.data.latex;

    const history = await ConversionHistory.create({
      userId: req.userId, // 認証を使用している場合、reqからユーザIDを取得する
      latexText: latex,
      imagePath: 'path/to/saved/image'  // 実際の保存方法に合わせて修正
    });

    res.status(200).json({ latex, historyId: history.id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.uploadImage = upload.single('image');
