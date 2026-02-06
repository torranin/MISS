// Import axios
const axios = require("axios");

// Import Model
const Group = require("../models/group.model");

exports.createGroup = async (req, res) => {
  const payload = req.body;

  // console.log(payload);

  const group = new Group({
    group_type: payload.group_type,
    group_name: payload.group_name,
    group_description: payload.group_description,
    group_status: payload.group_status,
  });

  group.save().then((group) => {
    res.status(200).json({
      status: "success",
    });
  });
};

exports.getGroupReport = async (req, res) => {
  // const workGroups = await WorkGroup.find({ deleted_at: null });

  // const sortedWorkGroups = workGroups.sort((a, b) => {
  //   return a.work_group_name.localeCompare(b.work_group_name);
  // });

  const groups = await Group.aggregate([
    // ไม่ต้องกรอง deleted_at แล้วเนื่องจากเราลบข้อมูลออกจากฐานข้อมูลโดยตรง
    // เรียงลำดับตาม created_at จากน้อยไปมาก
    {
      $sort: { created_at: -1 },
    },
  ]);

  res.status(200).json({
    status: "success",
    groups: groups,
  });
};

exports.getGroupById = async (req, res) => {
  const groupId = req.params.groupId;
  const group = await Group.findById(groupId);
  res.status(200).json({
    status: "success",
    group: group,
  });
};

exports.updateGroup = async (req, res) => {
  try {
    const groupId = req.params.groupId;
    const updateData = {
      group_name: req.body.group_name,
      group_description: req.body.group_description,
      group_status: req.body.group_status,
    };
    
    const group = await Group.findByIdAndUpdate(
      groupId, 
      updateData,
      { new: true }
    );
    
    if (!group) {
      return res.status(404).json({
        status: "error",
        message: "ไม่พบกลุ่มงานที่ต้องการแก้ไข"
      });
    }
    
    res.status(200).json({
      status: "success",
      group: group
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "ไม่สามารถอัปเดตกลุ่มงานได้",
      error: error.message,
    });
  }
};

exports.deleteGroup = async (req, res) => {
  const groupId = req.params.groupId;
  try {
    await Group.findByIdAndDelete(groupId);
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
  const groupId = req.params.groupId;
  const group = await Group.findById(groupId);
  res.status(200).json({
    status: "success",
    group: group,
  });
};
