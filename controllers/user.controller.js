// Import Package
const crypto = require("crypto");

// Import Model
const User = require("../models/user.model");

// Import Mongoose
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

exports.getUsers = async (req, res) => {
  const users = await User.aggregate([
    {
      $match: { deleted_at: null },
    },
    {
      $project: {
        password: 0,
      },
    },
  ]);
  res.status(200).json({
    message: "Users fetched successfully",
    status: "success",
    users: users,
  });
};

exports.getUserReport = async (req, res) => {
  const users = await User.find(
    { deleted_at: null },
    { fullname: 1, account_status: 1 }
  );

  res.status(200).json({
    status: "success",
    users: users,
  });
};

exports.getUserById = async (req, res) => {
  const user = await User.aggregate([
    {
      $match: { _id: new ObjectId(req.body.user_id) },
    },
    {
      $project: {
        password: 0,
      },
    },
  ]);

  res.status(200).json({
    message: "User fetched successfully",
    status: "success",
    user: user.length > 0 ? user[0] : null,
  });
};

exports.updateUser = async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.body.user_id,
    {
      fullname: req.body.fullname,
      email: req.body.email,
    },
    {
      new: true,
    }
  );
  res.status(200).json({
    message: "User updated successfully",
    status: "success",
    user: user,
  });
};

exports.updatePassword = async (req, res) => {
  // Hash Password
  const hash_password = crypto
    .createHash("sha256")
    .update(req.body.password + process.env.SHA256_HASH_KEY)
    .digest("hex");

  await User.findByIdAndUpdate(
    req.body.user_id,
    { password: hash_password },
    { new: true }
  );

  res.status(200).json({
    message: "Password updated successfully",
    status: "success",
  });
};
