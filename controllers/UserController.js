const User = require("../models/userModel");

exports.getAllUsers = async (req, res, next) => {
  try {
    const doc = await User.find();

    if (!doc) {
      throw Error("Not Found");
    }

    res.status(200).json({
      status: "success",
      data: doc,
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: "Error",
      message: "No User Found!",
    });
  }
};

exports.insertOneUser = async (req, res, next) => {
  try {
    const doc = await User.create(req.body);
    res.status(201).json({
      status: "success",
      message: "Successfully added a user",
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "Error",
      message: "Cannot Insert User!",
    });
  }
};

exports.getAllDealers = async (req, res, next) => {
  try {
    const doc = await User.find({ role: "dealer" }).select("-password");

    if (!doc) {
      res.status(404).json({
        status: "Error",
        message: "No Dealer Found",
      });
    }

    res.status(200).json({
      status: "success",
      data: doc,
    });
  } catch (err) {
    res.status(404).json({
      status: "Error",
      message: "No Dealer Found",
    });
  }
};

exports.updateUserData = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        name: req.body.name,
        email: req.body.email,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    req.user = updatedUser;

    res.status(200).json({
      status: "success",
      message: "User Updated",
      data: updatedUser,
    });
  } catch (err) {
    res.status(400).json({
      status: "Error",
      message: "Couldn't Update",
    });
  }
};

exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      res.status(404).json({
        status: "Error",
        message: "Cannot get the user!",
      });
    }

    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (err) {
    res.status(404).json({
      status: "Error",
      message: "Cannot get the user!",
    });
  }
};
