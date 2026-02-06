var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var GroupSchema = new Schema({
  group_type: { type: String, default: null },
  group_name: { type: String, default: null },
  group_description: { type: String, default: null },
  group_status: { type: Boolean, default: true },
  created_at: { type: Date, default: Date.now },
  deleted_at: { type: Date, default: null },
});

var Group = mongoose.model("Group", GroupSchema);

module.exports = Group;
