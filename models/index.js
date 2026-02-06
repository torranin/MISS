const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;
db.user = require("./user.model");
db.workGroup = require("./work-group.model");
db.agency = require("./agency.model");
// db.value = require("./value.model");
// db.indicators = require("./indicators.model");

module.exports = db;
