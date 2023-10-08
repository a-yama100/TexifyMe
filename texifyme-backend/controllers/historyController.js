// E:\programming\Project\TexifyMe\texifyme-backend\controllers\historyController.js

const { ConversionHistory } = require('../models');

exports.createHistory = async (req, res) => {
    try {
        const history = await ConversionHistory.create({
            userId: req.user.id,
            latexText: req.body.latexText,
            imagePath: req.body.imagePath
        });
        res.status(201).json(history);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getUserHistories = async (req, res) => {
    try {
        const histories = await ConversionHistory.findAll({
            where: {
                userId: req.user.id
            }
        });
        res.status(200).json(histories);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
