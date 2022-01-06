const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const commentSchema = new mongoose.Schema(
    {
        description: {
            type: String,
            minlength: 1,
            required: true,
        },
        author: {
            type: ObjectId,
            ref: 'User',
            required: true,
        },
        post: {
            type: ObjectId,
            ref: 'Post',
            required: true,
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

module.exports = mongoose.model('Comment', commentSchema);
