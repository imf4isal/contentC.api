const Content = require('../models/contentModel');

exports.createContent = async (req, res) => {
    try {
        const content = await Content.create(req.body);

        res.status(200).json({
            status: 'content successfully created.',
            data: {
                content,
            },
        });
    } catch (error) {
        res.status(400).json({
            status: 'adding new content source failed.',
            data: error,
        });
    }
};

exports.getAllContents = async (req, res) => {
    try {
        //copy object from the query object
        const queryObj = { ...req.query };

        //exclude particular field for result consistency
        const excludedFields = ['sort', 'page', 'limit', 'fields'];
        excludedFields.forEach((exField) => delete queryObj[exField]);

        //obj->json string to work with operators
        let queryString = JSON.stringify(queryObj);
        queryString = queryString.replace(
            /\b(gt|gte|lt|lte|in)\b/g,
            (match) => `$${match}`
        );

        //result
        let contents = await Content.find(JSON.parse(queryString));

        res.status(200).json({
            status: 'success',
            result: contents.length,
            data: {
                contents,
            },
        });
    } catch (error) {
        res.status(404).json({
            status: 'data can not be retrieved.',
            data: error,
        });
    }
};

exports.getContent = async (req, res) => {
    try {
        const content = await Content.findById(req.params.id);

        res.status(200).json({
            status: 'success',
            data: {
                content,
            },
        });
    } catch (error) {
        res.status(404).json({
            status: 'data can not be retrieved.',
            data: error,
        });
    }
};

exports.updateContent = async (req, res) => {
    try {
        const content = await Content.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        console.log(req.body);

        res.status(200).json({
            status: 'successfully updated',
            data: {
                content,
            },
        });
    } catch (error) {
        res.status(404).json({
            status: 'data can not be updated.',
            data: error,
        });
    }
};

exports.deleteContent = async (req, res) => {
    try {
        await Content.findByIdAndDelete(req.params.id);

        res.status(200).json({
            status: 'successfully deleted',
            data: null,
        });
    } catch (error) {
        res.status(404).json({
            status: 'data can not be deleted.',
            data: error,
        });
    }
};
