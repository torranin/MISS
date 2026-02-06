const agencyController = require("../controllers/agency.controller");

module.exports = (app) => {
  app.get("/api/agency/get-agency-report", agencyController.getAgencyReport);
  app.post("/api/agency/create-agency", agencyController.createAgency);
  app.post("/api/agency/update-agency/:agencyId", agencyController.updateAgency);
  app.post("/api/agency/delete-agency/:agencyId", agencyController.deleteAgency);
  app.get("/api/agency/get-agency-by-id/:agencyId", agencyController.getAgencyById);
};
