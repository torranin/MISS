var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var YearSchema = new Schema({
  year: { type: String, default: null },
  year_status: { type: Boolean, default: true },
  created_at: { type: Date, default: Date.now },
  deleted_at: { type: Date, default: null },
});

var Year = mongoose.model("Year", YearSchema);

module.exports = Year;
