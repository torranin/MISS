const authController = require("../controllers/auth.controller");

module.exports = (app) => {
  app.post("/api/auth/login", authController.login);
  app.post("/api/auth/register", authController.register);
  app.post("/api/auth/verify-user-by-token", authController.verifyUserByToken);
};
