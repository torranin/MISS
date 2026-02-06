var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var BasicValueSchema = new Schema({
  basic_value_variable_name: { type: String, default: null },
  basic_value_variable_name_eng: { type: String, default: null },
  value: { type: Number, default: null },
  year: { type: String, default: null },
  month: { type: String, default: null },
  created_at: { type: Date, default: Date.now },
  deleted_at: { type: Date, default: null },
});

var BasicValue = mongoose.model("BasicValue", BasicValueSchema);

module.exports = BasicValue;
