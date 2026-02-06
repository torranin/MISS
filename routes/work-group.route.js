const workGroupController = require("../controllers/work-group.controller");

module.exports = (app) => {
  app.get("/api/work-group/get-work-group-report", workGroupController.getWorkGroupReport);
  app.post("/api/work-group/create-work-group", workGroupController.createWorkGroup);
  app.post("/api/work-group/update-work-group/:workGroupId", workGroupController.updateWorkGroup);
  app.post("/api/work-group/delete-work-group/:workGroupId", workGroupController.deleteWorkGroup );
  app.get("/api/work-group/get-work-group-by-id/:workGroupId", workGroupController.getWorkGroupById);
};