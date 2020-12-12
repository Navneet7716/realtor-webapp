const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  pending: {
    type: Boolean,
    default: true,
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  requestedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
});

notificationSchema.pre(/^find/, function (next) {
  this.populate({
    path: "userId",
    select: "-__v -passwordChangedAt",
  });
  this.populate({
    path: "requestedBy",
    select: "-__v -passwordChangedAt",
  });

  next();
});

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
