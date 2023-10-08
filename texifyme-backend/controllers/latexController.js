// E:\programming\Project\TexifyMe\texifyme-backend\controllers\latexController.js

const axios = require('axios');

exports.convertToLaTex = async (req, res) => {
    const image = req.file.buffer.toString('base64');

    try {
        const response = await axios.post('https://api.mathpix.com/v3/latex', {
            src: `data:image/jpeg;base64,${image}`
        }, {
            headers: {
                'app_id': 'YOUR_APP_ID',
                'app_key': 'YOUR_APP_KEY',
                'Content-type': 'application/json'
            }
        });

        const latex = response.data.latex;
        res.json({ latex });
    } catch (error) {
        res.status(500).json({ error: 'Error converting image to LaTex' });
    }
};
