const userController = require("../controllers/user.controller");

module.exports = (app) => {
  app.get("/api/user/get-users", userController.getUsers);
  app.post("/api/user/get-user-by-id", userController.getUserById);
  app.post("/api/user/update-user", userController.updateUser);
  app.post("/api/user/update-password", userController.updatePassword);
};
