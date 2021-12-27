const Comment = require('../../models/comment/comment.model');
const catchAsync = require('../../utils/catchAsync');
const factory = require('../handlers/handlerFactory');
const AppError = require('../../utils/appError');

const addComment = factory.createOne(Comment);

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
