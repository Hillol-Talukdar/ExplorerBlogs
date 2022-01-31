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
    .route('/my/:id')
    .patch(checkAuth, commentController.updateMyComment)
    .delete(checkAuth, commentController.deleteMyComment);

router
    .route('/:id')
    .get(commentController.getAComment)
    .delete(checkAuth, restrictTo('admin'), commentController.deleteAComment);

module.exports = router;
