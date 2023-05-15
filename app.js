const fs = require('fs');
const express = require('express');
const contentRouter = require('./routes/contentRouter');

const app = express();

app.use('/api/v1/contents', contentRouter);

module.exports = app;
