var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var BasicValueVariableSchema = new Schema({
  name: { type: String, default: null },
  name_eng: { type: String, default: null },
  description: { type: String, default: null },
  status: { type: Boolean, default: true },
  created_at: { type: Date, default: Date.now },
  deleted_at: { type: Date, default: null },
});

var BasicValueVariable = mongoose.model(
  "BasicValueVariable",
  BasicValueVariableSchema
);

module.exports = BasicValueVariable;
