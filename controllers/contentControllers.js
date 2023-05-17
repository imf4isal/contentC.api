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

class Features {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    filter() {
        const queryObj = { ...this.queryString };

        //exclude particular field for result consistency
        const excludedFields = ['sort', 'page', 'limit', 'fields'];
        excludedFields.forEach((exField) => delete queryObj[exField]);

        //obj->json string to work with operators
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(
            /\b(gt|gte|lt|lte|in)\b/g,
            (match) => `$${match}`
        );

        this.query = this.query.find(JSON.parse(queryStr));

        return this;
    }

    sort() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        }

        return this;
    }

    project() {
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(',').join(' ');
            this.query = this.query.select(fields);
        } else {
            this.query = this.query.select('-__v');
        }

        return this;
    }

    paginate() {
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit || 100;
        const skip = (page - 1) * limit;

        this.query = this.query.skip(skip).limit(limit);

        return this;
    }
}

exports.getAllContents = async (req, res) => {
    try {
        //final output
        const contentFeatures = new Features(
            Content.find(),
            req.query
        ).filter();

        const contents = await contentFeatures.query;

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
