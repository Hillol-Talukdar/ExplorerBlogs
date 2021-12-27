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

const deleteAComment = factory.deleteOneById(Comment);

module.exports = {
    addComment,
    getAllComment,
    getAComment,
    updateAComment,
    deleteAComment,
};
