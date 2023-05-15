const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    about: {
        type: String,
    },
    language: {
        type: String,
    },
    url: {
        type: String,
        required: true,
    },
    sharedBy: {
        type: String,
        required: true,
    },
    categories: {
        type: [String],
        required: true,
    },
    rating: {
        type: Number,
        default: 0,
    },
    ratingQuantity: {
        type: Number,
        default: 0,
    },
    commentsQuantity: {
        type: Number,
        default: 0,
    },
    comments: [
        {
            user: String,
            timeStamp: Date,
            reactionCount: Number,
            replies: [
                {
                    user: String,
                    timestamp: Date,
                    reactionCount: Number,
                },
            ],
        },
    ],
    bookmarkedCount: {
        type: Number,
        default: 0,
    },
    type: {
        type: String,
        enum: ['article', 'video', 'podcast'],
    },
});

const Content = mongoose.model('Content', contentSchema);

module.exports = Content;
