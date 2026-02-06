const basicValueVariableController = require("../controllers/basic-value-variable.controller");

module.exports = (app) => {
  app.get(
    "/api/basic-value-variable/get-basic-value-variable-report",
    basicValueVariableController.getBasicValueVariableReport
  );
  app.post(
    "/api/basic-value-variable/create-basic-value-variable",
    basicValueVariableController.createBasicValueVariable
  );
  app.get(
    "/api/basic-value-variable/get-basic-value-variable-by-id/:basicValueVariableId",
    basicValueVariableController.getBasicValueVariableById
  );
  app.post(
    "/api/basic-value-variable/update-basic-value-variable/:basicValueVariableId",
    basicValueVariableController.updateBasicValueVariable
  );
  app.post(
    "/api/basic-value-variable/delete-basic-value-variable/:basicValueVariableId",
    basicValueVariableController.deleteBasicValueVariable
  );
};
