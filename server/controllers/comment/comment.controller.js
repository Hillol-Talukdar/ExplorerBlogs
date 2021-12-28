const Comment = require('../../models/comment/comment.model');
const catchAsync = require('../../utils/catchAsync');
const factory = require('../handlers/handlerFactory');
const AppError = require('../../utils/appError');

const addComment = catchAsync(async (req, res, next) => {
    req.body.author = req.user;

    const doc = await Comment.create(req.body);

    res.status(201).json({
        status: 'Success',
        data: doc,
    });
});

const getAllComment = factory.getAll(Comment);

const getAComment = factory.getOneById(Comment);

const updateAComment = factory.updateOneById(Comment);

const updateMyComment = catchAsync(async (req, res, next) => {
    const comment = await Comment.findOneAndUpdate(
        { _id: req.params.id, author: req.user },
        req.body,
        {
            new: true,
            runValidators: true,
        }
    );

    if (!comment) {
        return next(
            new AppError(
                'No comment found with that id/ this user is not the author of the comment.',
                404
            )
        );
    }

    res.status(200).json({
        status: 'Success',
        data: comment,
    });
});

const deleteAComment = factory.deleteOneById(Comment);

const deleteMyComment = catchAsync(async (req, res, next) => {
    const comment = await Model.findOneAndRemove({
        _id: req.params.id,
        author: req.user,
    });

    if (!comment) {
        return next(
            new AppError(
                'No comment found with that id/ this user is not the author of the comment.',
                404
            )
        );
    }

    res.status(200).json({
        status: 'Success',
    });
});

module.exports = {
    addComment,
    getAllComment,
    getAComment,
    updateAComment,
    updateMyComment,
    deleteAComment,
    deleteMyComment,
};
