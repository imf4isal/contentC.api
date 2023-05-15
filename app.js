const fs = require('fs');
const express = require('express');

const app = express();

const contents = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/contents.json`)
);

app.get('/api/v1/contents', (req, res) => {
    res.status(200).json({
        status: 'success',
        result: contents.length,
        data: {
            contents,
        },
    });
});

app.get('/api/v1/contents/:id', (req, res) => {
    const id = req.params.id * 1;

    const content = contents.find((c) => c.id === id);
    console.log(content);

    res.status(200).json({
        status: 'success',
        data: {
            content,
        },
    });
});

app.listen(3000, () => {
    console.log('server is running...');
});
