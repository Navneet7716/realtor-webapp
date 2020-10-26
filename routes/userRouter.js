const express = require("express");
const UserController = require("../controllers/UserController");
const AuthController = require("../controllers/authController");
const router = express.Router();

router.post("/signup", AuthController.signup);
router.post("/login", AuthController.login);
router.get("/logout", AuthController.logout);

router.post("/forgotPassword", AuthController.forgotPassword);

router.patch("/resetPassword/:token", AuthController.resetPassword);

router.patch(
  "/updateMyPassword",
  AuthController.protect,
  AuthController.updatePassword
);

router
  .route("/updateMe")
  .post(AuthController.protect, UserController.updateUserData);

router.route("/getMe").get(AuthController.protect, UserController.getMe);

router
  .route("/")
  .get(
    AuthController.restrictTo("admin"),
    AuthController.protect,
    UserController.getAllUsers
  )
  .post(
    AuthController.restrictTo("admin"),
    AuthController.protect,
    UserController.insertOneUser
  );

router.route("/dealers").get(UserController.getAllDealers);

module.exports = router;
