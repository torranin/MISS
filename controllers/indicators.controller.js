// Import axios
const axios = require("axios");

// Import Model
const Indicators = require("../models/indicators.model");
const Agency = require("../models/agency.model");
const WorkGroup = require("../models/work-group.model");

exports.createIndicators = async (req, res) => {
  try {
    const payload = req.body;

    // ตรวจสอบข้อมูลที่จำเป็น
    if (!payload.indicators_name) {
      return res.status(400).json({
        status: "error",
        message: "กรุณาระบุชื่อตัวชี้วัด",
      });
    }

    if (!payload.variable_name) {
      return res.status(400).json({
        status: "error",
        message: "กรุณาระบุชื่อตัวชี้วัด",
      });
    }

    // console.log(payload);
    const indicators = new Indicators({
      group_type: payload.group_type,
      indicators_code: payload.indicators_code,
      indicators_name: payload.indicators_name,
      indicators_description: payload.indicators_description,
      indicators_objective: payload.indicators_objective,
      indicators_Source: payload.indicators_Source,
      required_information: payload.required_information,
      disease_code: payload.disease_code,
      interpret_results: payload.interpret_results,
      locale_benchmark: payload.locale_benchmark,
      improvement: payload.improvement,
      frequency: payload.frequency,
      Unit: payload.Unit,
      formula: payload.formula,
      type: payload.type,
      responsible: payload.responsible,
      responsible_person: payload.responsible_person,
      indicators_status: payload.indicators_status || true,
    });
    // console.log(indicators);

    await indicators.save();

    return res.status(200).json({
      status: "success",
      message: "บันทึกข้อมูลตัวชี้วัดสำเร็จ",
      indicators: indicators,
      payload: payload,
    });
  } catch (error) {
    console.error("Error creating indicators:", error);

    // ตรวจสอบว่าเป็น MongoDB validation error หรือไม่
    if (error.name === "ValidationError") {
      return res.status(400).json({
        status: "error",
        message: "ข้อมูลไม่ถูกต้อง กรุณาตรวจสอบข้อมูลที่กรอก",
        error: error.message,
      });
    }

    // ตรวจสอบว่าเป็น MongoDB duplicate key error หรือไม่
    if (error.code === 11000) {
      return res.status(400).json({
        status: "error",
        message: "มีข้อมูลตัวชี้วัดนี้อยู่แล้ว",
        error: error.message,
      });
    }

    return res.status(500).json({
      status: "error",
      message: "เกิดข้อผิดพลาดในการบันทึกข้อมูล",
      error: error.message,
    });
  }
};

exports.getIndicatorsReport = async (req, res) => {
  try {
    // ดึงข้อมูลตัวชี้วัดทั้งหมดที่ยังไม่ถูกลบ
    const indicators = await Indicators.find({ deleted_at: null });

    // สร้างอาร์เรย์เพื่อเก็บข้อมูลที่จะส่งกลับไป
    const indicatorsWithDetails = [];

    // วนลูปเพื่อดึงข้อมูลเพิ่มเติมสำหรับแต่ละตัวชี้วัด
    for (const indicator of indicators) {
      const indicatorObj = indicator.toObject();

      // เพิ่มชื่อหน่วยงานหรือกลุ่มงาน
      if (indicator.aws === "agency" && indicator.aws_id) {
        try {
          const agency = await Agency.findById(indicator.aws_id);
          if (agency) {
            indicatorObj.aws_name = agency.agency_name;
          }
        } catch (error) {
          console.error("Error fetching agency:", error);
        }
      } else if (indicator.aws === "work_group" && indicator.aws_id) {
        try {
          const workGroup = await WorkGroup.findById(indicator.aws_id);
          if (workGroup) {
            indicatorObj.aws_name = workGroup.work_group_name;
          }
        } catch (error) {
          console.error("Error fetching work group:", error);
        }
      }

      indicatorsWithDetails.push(indicatorObj);
    }

    res.status(200).json({
      status: "success",
      indicators: indicatorsWithDetails,
    });
  } catch (error) {
    console.error("Error fetching indicators:", error);
    res.status(500).json({
      status: "error",
      message: "เกิดข้อผิดพลาดในการดึงข้อมูลตัวชี้วัด",
      error: error.message,
    });
  }
};

exports.getIndicatorById = async (req, res) => {
  const indicatorId = req.params.indicatorId;
  const indicator = await Indicators.findById(indicatorId);
  if (!indicator) {
    return res.status(400).json({
      status: "error",
      message: "ไม่พบข้อมูลตัวชี้วัดนี้ในระบบ",
    });
  }
  res.status(200).json({
    status: "success",
    indicator: indicator,
  });
};

exports.updateIndicator = async (req, res) => {
  const indicatorId = req.params.indicatorId;
  const payload = req.body;
  const indicator = await Indicators.findByIdAndUpdate(indicatorId, payload, {
    new: true,
  });
  res.status(200).json({ indicator });
};

exports.deleteIndicator = async (req, res) => {
  try {
    const indicatorId = req.params.indicatorId;
    const indicator = await Indicators.findByIdAndDelete(indicatorId);

    if (!indicator) {
      return res.status(404).json({
        status: "error",
        message: "ไม่พบข้อมูลตัวชี้วัดที่ต้องการลบ",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "ลบข้อมูลตัวชี้วัดสำเร็จ",
    });
  } catch (error) {
    console.error("Error deleting indicator:", error);
    return res.status(500).json({
      status: "error",
      message: "เกิดข้อผิดพลาดในการลบข้อมูลตัวชี้วัด",
      error: error.message,
    });
  }
};
