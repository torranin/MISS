const basicValueController = require("../controllers/basic-value.controller");

module.exports = (app) => {
  app.get(
    "/api/basic-value/get-basic-value-report",
    basicValueController.getBasicValueReport
  );
  app.post(
    "/api/basic-value/create-basic-value",
    basicValueController.createBasicValue
  );
  app.get(
    "/api/basic-value/get-basic-value-by-id/:basicValueId",
    basicValueController.getBasicValueById
  );
  app.post(
    "/api/basic-value/update-basic-value/:basicValueId",
    basicValueController.updateBasicValue
  );
  app.post(
    "/api/basic-value/delete-basic-value/:basicValueId",
    basicValueController.deleteBasicValue
  );
};
