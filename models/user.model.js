var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  fullname: { type: String, default: null },
  job_position: { type: String, default: null },
  cid: { type: String, default: null },
  email: { type: String, default: null },
  password: { type: String, default: "" },
  permission_role: { type: String, default: "general_user" },
  account_status: { type: Boolean, default: true },
  created_at: { type: Date, default: Date.now },
  deleted_at: { type: Date, default: null },
});

var User = mongoose.model("User", UserSchema);

module.exports = User;
