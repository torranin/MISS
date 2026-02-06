const yearController = require("../controllers/year.controller");

module.exports = (app) => {
  app.get("/api/year/get-year-report", yearController.getYearReport);
  app.post("/api/year/create-year", yearController.createYear);
  app.get("/api/year/get-year-by-id/:yearId", yearController.getYearById);
  app.post("/api/year/update-year/:yearId", yearController.updateYear);
  app.post("/api/year/delete-year/:yearId", yearController.deleteYear );   
};