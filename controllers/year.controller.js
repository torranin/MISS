// Import axios
const axios = require("axios");

// Import Model
const Year = require("../models/year.model");


exports.createYear = async (req, res) => {
  const payload = req.body;
  const year = await Year.findOne({ year: payload.year });

  if (year) {
    return res.status(400).json({
      status: "error",
      message: "ปีนี้มีอยู่ในระบบแล้ว",
    });
  }
  const newYear = new Year({
    year: payload.year,
    year_status: payload.year_status,
  });
  newYear.save().then((year) => {
    res.status(200).json({
      status: "success",
    });
  });
};


exports.getYearReport  = async (req, res) => {
  const years = await Year.find();


  if (years.length === 0) {
    return res.status(400).json({
      status: "error",
      message: "ไม่มีปีในระบบ",
    });
  }
  res.status(200).json({
    status: "success",
    years: years,
  });
  
};


exports.getYearById = async (req, res) => {
  const yearId = req.params.yearId;
  const year = await Year.findById(yearId);
  if (!year) {
    return res.status(400).json({
      status: "error",
      message: "ไม่พบปีนี้ในระบบ",
    });
  }
  res.status(200).json({
    status: "success",
    year: year,
  });
};


exports.updateYear = async (req, res) => {
  const yearId = req.params.yearId;
  const payload = req.body;
  const year = await Year.findById(yearId);
  year.year = payload.year;
  year.year_status = payload.year_status;
  await year.save();
  res.status(200).json({
    status: "success",
    year: year,
  });
};

exports.deleteYear = async (req, res) => {
  const yearId = req.params.yearId;
  try {
    const result = await Year.findByIdAndDelete(yearId);
    if (!result) {
      return res.status(400).json({
        status: "error",
        message: "ไม่พบปีนี้ในระบบ",
      });
    }
    res.status(200).json({
      status: "success"
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "เกิดข้อผิดพลาดในการลบข้อมูล",
      error: error.message
    });
  }
};