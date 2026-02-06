// Import axios
const axios = require("axios");

// Import Model
const Value = require("../models/value.model");


exports.createValue = async (req, res) => {
  const payload = req.body;

  const findValue = await Value.findOne({
    value_name: payload.value_name,
    value_description: payload.value_description,
    value_status: payload.value_status,
    deleted_at: null,
  });

  if (findValue) {
    res.status(200).json({
      message: "ค่านี้มีอยู่ในระบบแล้ว",
      status: "error",
    });
  } else {
    const agency = new Agency({
      value_name: payload.value_name,
      value_description: payload.value_description,
      value_status: payload.value_status,
    });
    value.save().then((value) => {
      res.status(200).json({
        message: "ค่าถูกสร้างเรียบร้อย",
        status: "success",
      });
    });
  }
};