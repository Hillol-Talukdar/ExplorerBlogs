const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const postSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            minlength: 1,
        },
        description: {
            type: String,
            minlength: 1,
            required: true,
        },
        comments: [
            {
                type: ObjectId,
                ref: "Comment",
            },
        ],
        author: {
            type: ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
