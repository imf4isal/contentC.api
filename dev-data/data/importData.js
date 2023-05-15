const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const fs = require('fs');

dotenv.config({ path: './config.env' });

mongoose
    .connect(process.env.DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('connection established...'));

const contents = JSON.parse(fs.readFileSync('./contents.json'));

const importData = async () => {
    try {
        await Content.create(contents);
        console.log('data has been imported.');
    } catch (error) {
        console.log(error);
    }
};
