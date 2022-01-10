const protect = require("../middleware/authMiddleware");

const rateLimit = require("express-rate-limit");

const rateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 15,
  message: "You have exceeded the 15 requests in 1 min limit!",
  headers: true,
});

module.exports = (app) => {
  const ServiceContainer = require("../services");
  const UserController = require("../controllers/userControllers");
  const UserControllerHandler = UserController(ServiceContainer);

  var router = require("express").Router();

  // create new user
  router.post("/", (req, res) => UserControllerHandler.addUser(req, res));

  // user login
  router.post("/login", (req, res) =>
    UserControllerHandler.loginUser(req, res)
  );

  // get all users
  router.get("/getusers", protect, rateLimiter, (req, res) => {
    UserControllerHandler.getUsers(req, res);
  });

  // update a user
  router.put("/update", protect, (req, res) =>
    UserControllerHandler.updateUser(req, res)
  );

  app.use("/api/user", router);
};
