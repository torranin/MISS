const groupController = require("../controllers/group.controller");

module.exports = (app) => {
  app.get("/api/group/get-group-report", groupController.getGroupReport);
  app.post("/api/group/create-group", groupController.createGroup);
  app.post("/api/group/update-group/:groupId", groupController.updateGroup);
  app.post("/api/group/delete-group/:groupId", groupController.deleteGroup );
  app.get("/api/group/get-group-by-id/:groupId", groupController.getGroupById);
};