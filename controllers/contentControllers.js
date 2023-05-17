const fs = require('fs');
const Content = require('../models/contentModel');

const contents = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/contents.json`)
);

exports.getAllContents = async (req, res) => {
    const contents = await Content.find();

    res.status(200).json({
        status: 'success',
        result: contents.length,
        data: {
            contents,
        },
    });
};

exports.getContent = async (req, res) => {
    const content = await Content.findById(req.params.id);

    res.status(200).json({
        status: 'success',
        data: {
            content,
        },
    });
};

exports.updateContent = async (req, res) => {
    try {
        const content = await Content.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );
        console.log(content);

        res.status(200).json({
            status: 'successfully updated',
            data: {
                content,
            },
        });
    } catch (error) {
        console.log(error);
    }
};

exports.deleteContent = async (req, res) => {
    try {
        const content = await Content.findByIdAndDelete(req.params.id);
        console.log(content);

        res.status(200).json({
            status: 'successfully deleted',
            data: null,
        });
    } catch (error) {
        console.log(error);
    }
};
