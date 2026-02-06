var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var IndicatorsSchema = new Schema({
  group_type: { type: String, default: null },
  indicators_code: { type: String, default: null },
  indicators_name: { type: String, default: null },
  year: { type: String, default: null },
  indicators_description: { type: String, default: null },
  indicators_objective: { type: String, default: null },
  indicators_source: { type: String, default: null },
  required_information: { type: String, default: null },
  disease_code: { type: String, default: null },
  required_information: { type: String, default: null },
  variable_name: { type: String, default: null },
  divisor_name: { type: String, default: null },
  interpret_results: { type: String, default: null },
  locale_benchmark: { type: String, default: null },
  improvement: { type: String, default: null },

  frequency: { type: String, default: null },
  Unit: { type: String, default: null },
  formula: { type: String, default: null },
  type: { type: String, default: null },
  responsible: { type: String, default: null },
  responsible_person: { type: String, default: null },

  indicators_status: { type: Boolean, default: false },

  time_period: {
    type: Boolean,
    enum: ["shift", "day", "month"],
    default: "month",
  },

  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  deleted_at: { type: Date, default: null },
});

var Indicators = mongoose.model("Indicators", IndicatorsSchema);

module.exports = Indicators;
