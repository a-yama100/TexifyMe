// E:\programming\Project\TexifyMe\texifyme-backend\index.js

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;
const uploadRoutes = require('./routes/uploadRoutes');

app.use(express.json());  // JSON body parserを最初に配置

app.use(cors());

const userRoutes = require('./routes/userRoutes'); // ユーザールートをインポート
app.use('/users', userRoutes); // ユーザールートを統合

app.get('/', (req, res) => {
    res.send('Hello, TexifyMe Backend!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

const adminRoutes = require('./routes/adminRoutes');
app.use('/admin', adminRoutes);

app.use('/upload', uploadRoutes);
