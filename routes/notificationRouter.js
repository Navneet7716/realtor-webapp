const express = require("express");
const notificationController = require("../controllers/notificationController");
const AuthController = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .post(AuthController.protect, notificationController.createNotification);

router
  .route("/accept")
  .post(AuthController.protect, notificationController.acceptNotification);

router
  .route("/decline")
  .post(AuthController.protect, notificationController.declineNotification);

router
  .route("/getNotification")
  .get(AuthController.protect, notificationController.getAllNotifications);

module.exports = router;
