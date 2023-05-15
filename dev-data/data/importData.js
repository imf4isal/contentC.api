const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const fs = require('fs');

const Content = require('../../models/contentModel');

dotenv.config({ path: './config.env' });

mongoose
    .connect(process.env.DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('connection established...'));

const contents = JSON.parse(fs.readFileSync(`${__dirname}/contents.json`));

const importAll = async () => {
    try {
        await Content.create(contents);
        console.log('data has been imported.');
    } catch (error) {
        console.log(error);
    }
};

const deleteAll = async () => {
    try {
        await Content.deleteMany({});
        console.log('deleted all data.');
    } catch (error) {
        console.log(error);
    }
};

if (process.argv[2] === '--import') importAll();
if (process.argv[2] === '--delete') deleteAll();
