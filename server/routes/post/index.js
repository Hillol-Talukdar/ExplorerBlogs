const express = require('express');
const postController = require('../../controllers/post/post.controller');
const checkAuth = require('../../middlewares/checkAuth');
const restrictTo = require('../../middlewares/restrictTo.js');
const router = express.Router();

router
    .route('/')
    .post(checkAuth, postController.addPost)
    .get(postController.getAllPost);

router
    .route('/:id')
    .get(postController.getPost)
    .patch(checkAuth, postController.updateMyPost)
    .delete(checkAuth, postController.deleteMyPost)
    .delete(checkAuth, restrictTo('admin'), postController.deleteAPost);

module.exports = router;
