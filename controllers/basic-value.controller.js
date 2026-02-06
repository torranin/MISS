// Import axios
const axios = require("axios");
const mongoose = require("mongoose");

// Import Model
const BasicValue = require("../models/basic-value.model");

function parseBoolean(value, defaultValue = true) {
  if (value === true || value === "true" || value === 1 || value === "1")
    return true;
  if (value === false || value === "false" || value === 0 || value === "0")
    return false;
  return defaultValue;
}

function normalizeObjectId(value) {
  if (value === undefined || value === null) return undefined;
  if (typeof value === "string" && value.trim() === "") return undefined;
  return mongoose.Types.ObjectId.isValid(value) ? value : undefined;
}

exports.createBasicValue = async (req, res) => {
  const payload = req.body || {};
  try {
    const newBasicValue = new BasicValue({
      basic_value_variable_name: payload.basic_value_variable_name,
      basic_value_variable_name_eng: payload.basic_value_variable_name_eng,
      value: payload.value,
      year: payload.year,
      month: payload.month,
    });
    await newBasicValue.save();
    return res.status(200).json({
      status: "success",
      basicValue: newBasicValue,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "error",
      message: "เกิดข้อผิดพลาดในการบันทึกข้อมูล",
      error: error.message,
    });
  }
};

exports.getBasicValueReport = async (req, res) => {
  const basicValues = await BasicValue.find({
    deleted_at: null,
  });

  if (basicValues.length === 0) {
    return res.status(400).json({
      status: "error",
      message: "ไม่มีค่าพื้นฐานในระบบ",
    });
  }
  res.status(200).json({
    status: "success",
    basicValues: basicValues,
  });
};

exports.getBasicValueById = async (req, res) => {
  const basicValueId = req.params.basicValueId;
  const basicValue = await BasicValue.findById(basicValueId);
  if (!basicValue) {
    return res.status(400).json({
      status: "error",
      message: "ไม่พบค่าพื้นฐานนี้ในระบบ",
    });
  }
  res.status(200).json({
    status: "success",
    basicValue: basicValue,
  });
};

exports.updateBasicValue = async (req, res) => {
  try {
    const basicValueId = req.params.basicValueId;
    const payload = req.body || {};

    if (!mongoose.Types.ObjectId.isValid(basicValueId)) {
      return res.status(400).json({
        status: "error",
        message: "ค่าพื้นฐานไม่ถูกต้อง",
      });
    }

    const basicValue = await BasicValue.findById(basicValueId);
    if (!basicValue) {
      return res.status(400).json({
        status: "error",
        message: "ไม่พบค่าพื้นฐานนี้ในระบบ",
      });
    }

    if (payload.basic_value_variable_name !== undefined) {
      basicValue.basic_value_variable_name = normalizeObjectId(
        payload.basic_value_variable_name
      );
    }
    if (payload.basic_value_variable_name_eng !== undefined)
      basicValue.basic_value_variable_name_eng =
        payload.basic_value_variable_name_eng;
    if (payload.value !== undefined) basicValue.value = payload.value;
    if (payload.year !== undefined) basicValue.year = payload.year;
    if (payload.month !== undefined) basicValue.month = payload.month;

    await basicValue.save();

    res.status(200).json({
      status: "success",
      basicValue: basicValue,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "เกิดข้อผิดพลาดในการแก้ไขข้อมูล",
      error: error.message,
    });
  }
};

exports.deleteBasicValue = async (req, res) => {
  const basicValueId = req.params.basicValueId;
  try {
    const result = await BasicValue.findByIdAndDelete(basicValueId);
    if (!result) {
      return res.status(400).json({
        status: "error",
        message: "ไม่พบค่าพื้นฐานนี้ในระบบ",
      });
    }
    res.status(200).json({
      status: "success",
      basicValue: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "เกิดข้อผิดพลาดในการลบค่าพื้นฐานนี้ในระบบ",
      error: error.message,
    });
  }
};
