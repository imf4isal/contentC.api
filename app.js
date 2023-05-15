const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.status(200).json({
        status: 'success',
    });
});

app.listen(3000, () => {
    console.log('server is running...');
});
