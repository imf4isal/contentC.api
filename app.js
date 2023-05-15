const fs = require('fs');
const express = require('express');

const app = express();

const contentController = require('./controllers/contentControllers');

app.route('/api/v1/contents').get(contentController.getAllContents);
app.route('/api/v1/contents/:id').get(contentController.getContent);

module.exports = app;
