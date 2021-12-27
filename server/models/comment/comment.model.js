const mongoose = require("mongoose");
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
            ref: "User",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);
