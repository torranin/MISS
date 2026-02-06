const indicatorsController = require("../controllers/indicators.controller");

module.exports = (app) => {
  app.get("/api/indicators/get-indicators-report", indicatorsController.getIndicatorsReport);
  app.post("/api/indicators/create-indicators", indicatorsController.createIndicators);
  app.get("/api/indicators/get-indicator-by-id/:indicatorId", indicatorsController.getIndicatorById);
  app.post("/api/indicators/update-indicator/:indicatorId", indicatorsController.updateIndicator);
  app.post("/api/indicators/delete-indicator/:indicatorId", indicatorsController.deleteIndicator);   
  // app.get("/api/indicators/get-indicators-by-id/:indicatorsId", indicatorsController.getIndicatorsById);
};