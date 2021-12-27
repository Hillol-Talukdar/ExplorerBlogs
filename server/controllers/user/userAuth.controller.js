const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/appError");
const tokenHelper = require("../../helpers/token");
const User = require("../../models/user/user.model");

const signup = catchAsync(async (req, res, next) => {
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

    createSendToken(newUser, 201, res);
});

const login = catchAsync(async (req, res, next) => {
    // username contains both username and email
    const { userName, password } = req.body;

    if (!userName || !password) {
        return next(new AppError("email/userName or password missing!", 401));
    }

    let user = await User.findOne({ email: userName }).select("+password");

    if (!user) {
        user = await User.findOne({ userName }).select("+password");

        if (!user) {
            return next(
                new AppError("Incorrect email/userName or password!", 401)
            );
        }
    }

    const isMatch = await matchPassowrd(password, user.password);

    if (!isMatch)
        return next(new AppError("Incorrect email/userName or password!", 401));

    createSendToken(user, 200, res);
});

const logout = (req, res) => {
    return res.status(202).clearCookie("token").send({
        status: "Success",
        message: "Token deleted",
    });
};

const createSendToken = (user, statusCode, res) => {
    const token = tokenHelper.generateAccessToken(user._id, user.role);
    const timeLimit = 31536000000; // one year

    const cookieOptions = {
        expires: new Date(Date.now() + timeLimit),
        httpOnly: true,
    };

    if (process.env.NODE_ENV === "production") {
        cookieOptions.secure = true;
    }

    res.cookie("token", token, cookieOptions);

    user.password = undefined; // hide the user password

    res.status(statusCode).json({
        status: "success",
        user,
        token,
    });
};

const matchPassowrd = async function (candidatePassword, userPassword) {
    return (isMatch = await bcrypt.compare(candidatePassword, userPassword));
};

module.exports = {
    signup,
    login,
    logout,
};
