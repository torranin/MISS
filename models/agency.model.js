var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var AgencySchema = new Schema({
  agency_name: { type: String, default: null },
  agency_description: { type: String, default: null },
  agency_status: { type: Boolean, default: true },
  created_at: { type: Date, default: Date.now },
  deleted_at: { type: Date, default: null },
});

var Agency = mongoose.model("Agency", AgencySchema);

module.exports = Agency;
