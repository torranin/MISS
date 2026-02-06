// Import Package
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

// Import Model
const User = require("../models/user.model");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  // Check if user already exists
  const findUser = await User.aggregate([
    {
      $match: {
        email: email,
      },
    },
  ]);

  if (findUser.length === 0) {
    return res.status(400).json({
      message: "User not found",
    });
  } else {
    // Check if password is correct
    const checkPassword = crypto
      .createHash("sha256")
      .update(password + process.env.SHA256_HASH_KEY)
      .digest("hex");

    if (checkPassword !== findUser[0].password) {
      return res.status(400).json({
        message: "Invalid password",
        status: "error",
      });
    } else {
      const renewUser = {
        _id: findUser[0]._id,
        fullname: findUser[0].fullname,
        job_position: findUser[0].job_position,
        email: findUser[0].email,
        permission_role: findUser[0].permission_role,
        account_status: findUser[0].account_status,
      };

      const generateToken = jwt.sign(renewUser, process.env.JWT_SECRET_KEY, {
        expiresIn: "7d",
      });

      return res.status(200).json({
        message: "Login successful",
        status: "success",
        token: generateToken,
      });
    }
  }
};

exports.register = async (req, res) => {
  const payload = req.body;

  // Check if user already exists
  const findUser = await User.findOne({ email: payload.email });
  if (findUser) {
    return res.status(400).json({
      message: "User already exists",
    });
  } else {
    // Hash Password
    const hash_password = crypto
      .createHash("sha256")
      .update(payload.password + process.env.SHA256_HASH_KEY)
      .digest("hex");

    payload.password = hash_password;

    // Create User
    const user = new User(payload);
    user.save().then((user) => {
      res.status(201).json({
        message: "User created successfully",
        status: "success",
        user,
      });
    });
  }
};

exports.verifyUserByToken = async (req, res) => {
  const { token } = req.body;

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  if (!decoded) {
    return res.status(400).json({
      message: "Invalid token",
      status: "error",
    });
  } else if (decoded.account_status === false) {
    return res.status(400).json({
      message: "User is not active",
      status: "error",
    });
  } else {
    return res.status(200).json({
      message: "User verified successfully",
      status: "success",
      user: decoded,
    });
  }
};
