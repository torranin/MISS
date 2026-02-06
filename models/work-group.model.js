var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var WorkGroupSchema = new Schema({
  work_group_name: { type: String, default: null },
  work_group_description: { type: String, default: null },
  work_group_status: { type: Boolean, default: true },
  created_at: { type: Date, default: Date.now },
  deleted_at: { type: Date, default: null },
});

var WorkGroup = mongoose.model("WorkGroup", WorkGroupSchema);

module.exports = WorkGroup;
