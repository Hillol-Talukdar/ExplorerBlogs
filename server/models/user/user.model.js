const mongoose = require("mongoose");
const validator = require("validator");
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            minlength: 2,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            validate: [validator.isEmail, "Please provide a valid email"],
        },
        userName: {
            type: String,
            requrired: true,
            minlength: 2,
            trim: true,
            unique: true,
        },
        mobile: {
            type: String,
            minlength: 10,
        },
        password: {
            type: String,
            minlength: 6,
            required: true,
        },
        role: {
            type: String,
            enum: ["admin", "user"],
            default: "user",
        },
    },
    { timestamps: true }
);

const User = new mongoose.model("User", userSchema);

module.exports = User;
