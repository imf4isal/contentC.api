const fs = require('fs');

const contents = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/contents.json`)
);

exports.getAllContents = (req, res) => {
    res.status(200).json({
        status: 'success',
        result: contents.length,
        data: {
            contents,
        },
    });
};

exports.getContent = (req, res) => {
    const id = req.params.id * 1;
    const content = contents.find((c) => c.id === id);

    res.status(200).json({
        status: 'success',
        data: {
            content,
        },
    });
};
