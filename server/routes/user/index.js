const express = require("express");
const router = express.Router();
const userAuthController = require("../../controllers/user/userAuth.controller");
const userController = require("../../controllers/user/user.controller");
const checkAuth = require("../../middlewares/checkAuth");
const restrictTo = require("../../middlewares/restrictTo");

router.post("/signup", userAuthController.signup);
router.post("/login", userAuthController.login);
router.get("/logout", userAuthController.logout);

router.use(checkAuth);

router
    .route("/")
    // .post(restrictTo("admin"), userController.addUser)
    .get(userController.getAllUser);

router.route("/me").get(userController.getMe).patch(userController.updateMe);

router
    .route("/:id")
    .get(userController.getUser)
    // .patch(restrictTo("admin"), userController.updateUser)
    .delete(restrictTo("admin"), userController.deleteUser);

module.exports = router;
