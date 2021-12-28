const Post = require('../../models/post/post.model');
const catchAsync = require('../../utils/catchAsync');
const factory = require('../handlers/handlerFactory');
const AppError = require('../../utils/appError');

const addPost = catchAsync(async (req, res, next) => {
    req.body.author = req.user;

    const doc = await Post.create(req.body);

    res.status(201).json({
        status: 'Success',
        data: doc,
    });
});

const getAllPost = factory.getAll(Post);

const getPost = factory.getOneById(Post);

const updateMyPost = catchAsync(async (req, res, next) => {
    delete req.body.post;

    const post = await Post.findOneAndUpdate(
        {
            _id: req.params.id,
            author: req.user,
        },
        req.body,
        {
            new: true,
            runValidators: true,
        }
    );

    if (!post) {
        return next(new AppError('No post found with that id and author', 404));
    }

    res.status(200).json({
        status: 'Success',
        data: post,
    });
});

const deleteAPost = factory.deleteOneById(Post);

const deleteMyPost = catchAsync(async (req, res, next) => {
    const post = await Post.findOneAndDelete({
        _id: req.params.id,
        author: req.user,
    });

    if (!post) {
        return next(new AppError('No post found with that id and author', 404));
    }

    res.status(200).json({
        status: 'Success',
    });
});

module.exports = {
    addPost,
    getAllPost,
    getPost,
    updateMyPost,
    deleteAPost,
    deleteMyPost,
};
