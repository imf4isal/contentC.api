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

app.listen(3000, () => {
    console.log('server is running...');
});
