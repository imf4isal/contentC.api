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

module.exports = Features;
