const Notification = require("../models/notificationModel");
const Email = require("../utils/email");

// pass the owner id from front end
exports.createNotification = async (req, res, next) => {
  try {
    const notification = {
      requestedBy: req.user._id,
      userId: req.body.id,
    };

    const doc = await Notification.create(notification);

    res.status(201).json({
      status: "Success",
      message: "Notification Created!",
      data: doc,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "Error",
      message: "Some Error In the backend",
    });
  }
};

// pass the notification id from front end and also requesting user
exports.acceptNotification = async (req, res, next) => {
  try {
    const id = req.body.id;
    const requser = {
      name: req.body.name,
      email: req.body.email,
    };
    const doc = await Notification.findByIdAndUpdate(
      id,
      { pending: false },
      {
        new: true,
      }
    );
    const url = doc.userId.email + "  " + doc.userId.phone;
    await new Email(requser, url).sendContactInfo();
    res.status(200).json({
      status: "Success",
      message:
        "Email has been sent from us including your phone number and email id",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "Error",
      message: "Some Error In the backend",
    });
  }
};

exports.declineNotification = async (req, res) => {
  try {
    const id = req.body.id;
    const reqUser = {
      name: req.body.name,
      email: req.body.email,
    };
    const doc = await Notification.findByIdAndDelete(id);
    url = "";
    await new Email(reqUser, url).sendDeclineMail();
    res.status(200).json({
      status: "Success",
      message: "Email has been sent informing the user that you have declined.",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "Error",
      message: "Some Error In the backend",
    });
  }
};

exports.getAllNotifications = async (req, res) => {
  try {
    const userId = req.user._id;
    const data = await Notification.find({ userId, pending: true });

    if (data) {
      res.status(200).json({
        status: "Success",
        data,
      });
    } else {
      res.status(200).json({
        status: "Success",
        message: "No notifications",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "Error",
      message: "Some Error In the backend",
    });
  }
};
