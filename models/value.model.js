var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ValueSchema = new Schema({
  indicators_id: { type: mongoose.Schema.Types.ObjectId },
  user_id: { type: mongoose.Schema.Types.ObjectId },
  variable_value: { type: Number, default: null },
  divisor_value: { type: Number, default: null },
  month: { type: String, default: null },
  year: { type: String, default: null },
  created_at: { type: Date, default: Date.now },
  deleted_at: { type: Date, default: null },
});

var Value = mongoose.model("Value", ValueSchema);

module.exports = Value;
