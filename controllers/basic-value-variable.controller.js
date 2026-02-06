// Import axios
const axios = require("axios");
const mongoose = require("mongoose");

// Import Model
const BasicValueVariable = require("../models/basic-value-variable.model");

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

exports.createBasicValueVariable = async (req, res) => {
  try {
    const payload = req.body || {};
    const newBasicValueVariable = new BasicValueVariable({
      basic_value_id: normalizeObjectId(payload.basic_value_id),
      name: payload.name ?? null,
      name_eng: payload.name_eng ?? null,
      description: payload.description ?? null,
      status: parseBoolean(payload.status, true),
    });

    await newBasicValueVariable.save();

    res.status(200).json({
      status: "success",
      basicValueVariable: newBasicValueVariable,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "เกิดข้อผิดพลาดในการบันทึกข้อมูล",
      error: error.message,
    });
  }
};

exports.getBasicValueVariableReport = async (req, res) => {
  const basicValueVariables = await BasicValueVariable.find({
    deleted_at: null,
  });

  if (basicValueVariables.length === 0) {
    return res.status(400).json({
      status: "error",
      message: "ไม่มีตัวแปรพื้นฐานในระบบ",
    });
  }
  res.status(200).json({
    status: "success",
    basicValueVariables: basicValueVariables,
  });
};

exports.getBasicValueVariableById = async (req, res) => {
  const basicValueVariableId = req.params.basicValueVariableId;
  const basicValueVariable = await BasicValueVariable.findById(
    basicValueVariableId
  );
  if (!basicValueVariable) {
    return res.status(400).json({
      status: "error",
      message: "ไม่พบตัวแปรพื้นฐานนี้ในระบบ",
    });
  }
  res.status(200).json({
    status: "success",
    basicValueVariable: basicValueVariable,
  });
};

exports.updateBasicValueVariable = async (req, res) => {
  try {
    const basicValueVariableId = req.params.basicValueVariableId;
    const payload = req.body || {};

    if (!mongoose.Types.ObjectId.isValid(basicValueVariableId)) {
      return res.status(400).json({
        status: "error",
        message: "ตัวแปรพื้นฐานไม่ถูกต้อง",
      });
    }

    const basicValueVariable = await BasicValueVariable.findById(
      basicValueVariableId
    );
    if (!basicValueVariable) {
      return res.status(400).json({
        status: "error",
        message: "ไม่พบตัวแปรพื้นฐานนี้ในระบบ",
      });
    }

    if (payload.basic_value_id !== undefined) {
      basicValueVariable.basic_value_id = normalizeObjectId(
        payload.basic_value_id
      );
    }
    if (payload.name !== undefined) basicValueVariable.name = payload.name;
    if (payload.name_eng !== undefined)
      basicValueVariable.name_eng = payload.name_eng;
    if (payload.description !== undefined)
      basicValueVariable.description = payload.description;
    if (payload.status !== undefined) {
      basicValueVariable.status = parseBoolean(payload.status, true);
    }

    await basicValueVariable.save();

    res.status(200).json({
      status: "success",
      basicValueVariable: basicValueVariable,
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

exports.deleteBasicValueVariable = async (req, res) => {
  const basicValueVariableId = req.params.basicValueVariableId;
  try {
    const result = await BasicValueVariable.findByIdAndDelete(
      basicValueVariableId
    );
    if (!result) {
      return res.status(400).json({
        status: "error",
        message: "ไม่พบตัวแปรพื้นฐานนี้ในระบบ",
      });
    }
    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "เกิดข้อผิดพลาดในการลบตัวแปรพื้นฐานนี้ในระบบ",
      error: error.message,
    });
  }
};
