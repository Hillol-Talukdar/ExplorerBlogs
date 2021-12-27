const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const User = require("../../models/user/user.model");
const catchAsync = require("../../utils/catchAsync");
const Factory = require("../handlers/handlerFactory");
const AppError = require("../../utils/appError");

const addUser = catchAsync(async (req, res, next) => {
    const { name, email, mobile, userName, password, confirmPassword } =
        req.body;

    let doesExist = await User.findOne({
        email,
        userName,
    });

    if (doesExist) {
        return next(new AppError("This email/userName already exists", 400));
    }

    const isValid = crypto.timingSafeEqual(
        Buffer.from(password),
        Buffer.from(confirmPassword)
    );

    if (!isValid) {
        return next(
            new AppError("Password and Confirm Password not matched", 401)
        );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
        name,
        email,
        mobile,
        userName,
        password: hashedPassword,
        role: "user",
    });

    res.status(201).json({
        status: "Success",
        data: newUser,
    });
});

const updateUser = catchAsync(async (req, res, next) => {
    let inputData = req.body;

    if (inputData.password) {
        let hashedPassword = await bcrypt.hash(inputData.password, 12);
        inputData.password = hashedPassword;
    }

    const user = await User.findOneAndUpdate(
        { _id: req.params.id, role: "user" },
        inputData,
        {
            new: true,
        }
    );

    if (!user) {
        return next(new AppError("No user found with that id", 404));
    }

    res.status(200).json({
        status: "Success",
        data: user,
    });
});

const deleteUser = catchAsync(async (req, res, next) => {
    const user = await User.findOneAndRemove({
        _id: req.params.id,
        role: "user",
    });

    if (!user) {
        return next(new AppError("No user found with that id", 404));
    }

    res.status(204).json({
        status: "Success",
    });
});

const getMe = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    if (!user) {
        return next(new AppError("No user found with that id", 404));
    }

    res.status(200).json({
        status: "Success",
        user,
    });
});

const updateMe = catchAsync(async (req, res, next) => {
    let inputData = req.body;

    if (inputData.currentPassword) {
        const userCheck = await User.findById(req.user.id);

        const isMatch = await matchPassowrd(
            inputData.currentPassword,
            userCheck.password
        );

        if (!isMatch)
            return next(new AppError("Current password did not match!", 401));

        // if (!inputData.confirmPassword) {
        //     return new AppError('Confirm password is required!', 401);
        // }

        // if (inputData.newPassword !== inputData.confirmPassword) {
        //     return new AppError('Password did not match!', 401);
        // }

        let hashedPassword = await bcrypt.hash(inputData.newPassword, 12);
        inputData.password = hashedPassword;
    }

    const user = await User.findByIdAndUpdate(req.user.id, inputData, {
        new: true,
    });

    if (!user) {
        return next(new AppError("No user found with that id", 404));
    }
    res.status(200).json({
        status: "Success",
        user,
    });
});

const getAllUser = catchAsync(async (req, res, next) => {
    const users = await User.find().sort("-createdAt");

    if (!users) {
        return next(new AppError("No users found", 404));
    }

    res.status(200).json({
        status: "Success",
        data: users,
    });
});

const getUser = catchAsync(async (req, res, next) => {
    let user = await User.findOne({ _id: req.params.id, role: "user" });

    if (!user) {
        return next(new AppError("No user found with that id", 404));
    }

    res.status(200).json({
        status: "Success",
        data: user,
    });
});

const matchPassowrd = async function (candidatePassword, userPassword) {
    return (isMatch = await bcrypt.compare(candidatePassword, userPassword));
};

module.exports = {
    addUser,
    updateUser,
    deleteUser,
    getAllUser,
    getUser,
    getMe,
    updateMe,
};
