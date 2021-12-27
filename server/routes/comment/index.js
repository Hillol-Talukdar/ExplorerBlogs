const express = require('express');
const commentController = require('../../controllers/comment/comment.controller');
const checkAuth = require('../../middlewares/checkAuth');
const restrictTo = require('../../middlewares/restrictTo.js');
const router = express.Router();

router
    .route('/')
    .post(checkAuth, commentController.addComment)
    .get(checkAuth, restrictTo('admin'), commentController.getAllComment);

router
    .route('/:id')
    .get(commentController.getAComment)
    .patch(checkAuth, commentController.updateAComment)
    .delete(checkAuth, commentController.deleteAComment);

module.exports = router;
