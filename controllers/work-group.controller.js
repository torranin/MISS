// Import axios
const axios = require("axios");

// Import Model
const WorkGroup = require("../models/work-group.model");

exports.createWorkGroup = async (req, res) => {
  const payload = req.body;

  // console.log(payload);

  const workGroup = new WorkGroup({
    work_group_name: payload.work_group_name,
    work_group_description: payload.work_group_description,
    work_group_status: payload.work_group_status,
  });

  workGroup.save().then((workGroup) => {
    res.status(200).json({
      status: "success",
    });
  });
};

exports.getWorkGroupReport = async (req, res) => {
  // const workGroups = await WorkGroup.find({ deleted_at: null });

  // const sortedWorkGroups = workGroups.sort((a, b) => {
  //   return a.work_group_name.localeCompare(b.work_group_name);
  // });

  const workGroups = await WorkGroup.aggregate([
    // ไม่ต้องกรอง deleted_at แล้วเนื่องจากเราลบข้อมูลออกจากฐานข้อมูลโดยตรง
    // เรียงลำดับตาม created_at จากน้อยไปมาก
    {
      $sort: { created_at: -1 },
    },
  ]);

  res.status(200).json({
    status: "success",
    workGroups: workGroups,
  });
};

exports.getWorkGroupById = async (req, res) => {
  const workGroupId = req.params.workGroupId;
  const workGroup = await WorkGroup.findById(workGroupId);
  res.status(200).json({
    status: "success",
    workGroup: workGroup,
  });
};

exports.updateWorkGroup = async (req, res) => {
  try {
    const workGroupId = req.params.workGroupId;
    const updateData = {
      work_group_name: req.body.work_group_name,
      work_group_description: req.body.work_group_description,
      work_group_status: req.body.work_group_status,
    };
    
    const workGroup = await WorkGroup.findByIdAndUpdate(
      workGroupId, 
      updateData,
      { new: true }
    );
    
    if (!workGroup) {
      return res.status(404).json({
        status: "error",
        message: "ไม่พบกลุ่มงานที่ต้องการแก้ไข"
      });
    }
    
    res.status(200).json({
      status: "success",
      workGroup: workGroup
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "ไม่สามารถอัปเดตกลุ่มงานได้",
      error: error.message,
    });
  }
};

exports.deleteWorkGroup = async (req, res) => {
  const workGroupId = req.params.workGroupId;
  try {
    await WorkGroup.findByIdAndDelete(workGroupId);
    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "ไม่สามารถลบกลุ่มงานได้"
    });
  }
};

exports.getWorkGroupById = async (req, res) => {
  const workGroupId = req.params.workGroupId;
  const workGroup = await WorkGroup.findById(workGroupId);
  res.status(200).json({
    status: "success",
    workGroup: workGroup,
  });
};
