const Post = require('../../models/post/post.model');
const catchAsync = require('../../utils/catchAsync');
const factory = require('../handlers/handlerFactory');
const AppError = require('../../utils/appError');
const APIFeatures = require('../../utils/apiFeatures');

const addPost = catchAsync(async (req, res, next) => {
    req.body.author = req.user;

    const doc = await Post.create(req.body);

    res.status(201).json({
        status: 'Success',
        data: doc,
    });
});

// const getAllPost = factory.getAll(Post, { path: 'author', select: 'name' });

const getAllPost = catchAsync(async (req, res) => {
    const features = new APIFeatures(Post.find({}), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();

    // used nexted populate so that we can find the author of a comment
    features.query = features.query
        .populate({ path: 'author', select: 'name' })
        .populate({
            path: 'comments',
            populate: { path: 'author', select: 'name' },
        });

    // const doc = await features.query.explain();
    const doc = await features.query;

    res.status(200).json({
        status: 'success',
        results: doc.length,
        data: doc,
    });
});

// const getPost = factory.getOneById(Post, { path: 'author', select: 'name' });

const getPost = catchAsync(async (req, res, next) => {
    // used nexted populate so that we can find the author of a comment
    let query = Post.findById(req.params.id)
        .populate({ path: 'author', select: 'name' })
        .populate({
            path: 'comments',
            populate: { path: 'author', select: 'name' },
        });

    const doc = await query;

    if (!doc) {
        return next(new AppError('No document found with that id', 404));
    }

    res.status(200).json({
        status: 'Success',
        data: doc,
    });
});

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
