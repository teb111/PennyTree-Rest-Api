const { errorResponse, successResponse } = require("../responses");
const { isEmpty } = require("../utils/util");

const UserController = (serviceContainer) => {
  const addUser = async (req, res) => {
    try {
      if (
        typeof req.body !== null &&
        req.body.hasOwnProperty("firstname") &&
        req.body.hasOwnProperty("lastname") &&
        req.body.hasOwnProperty("email") &&
        req.body.hasOwnProperty("password") &&
        req.body.hasOwnProperty("telephone")
      ) {
        const data = {
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          email: req.body.email,
          telephone: req.body.telephone,
          password: req.body.password,
        };
        if (
          isEmpty(data.firstname) ||
          isEmpty(data.lastname) ||
          isEmpty(data.email) ||
          isEmpty(data.telephone) ||
          isEmpty(data.password)
        ) {
          return errorResponse(res, "Required fields cannot be empty");
        } else {
          const result = await serviceContainer.userService.newUser(data);
          return successResponse(res, result);
        }
      } else {
        return errorResponse(res, "Missing Required Fields", 400);
      }
    } catch (error) {
      return errorResponse(res, error);
    }
  };

  const loginUser = async (req, res) => {
    try {
      if (
        typeof req.body !== null &&
        req.body.hasOwnProperty("email") &&
        req.body.hasOwnProperty("password")
      ) {
        const data = {
          email: req.body.email,
          password: req.body.password,
        };
        if (isEmpty(data.email) || isEmpty(data.password)) {
          return errorResponse(res, "Required fields cannot be empty");
        } else {
          const result = await serviceContainer.userService.userLogin(data);
          return successResponse(res, result);
        }
      } else {
        return errorResponse(res, "Missing Required Fields", 400);
      }
    } catch (error) {
      return errorResponse(res, error);
    }
  };

  const getUsers = async (req, res) => {
    try {
      const result = await serviceContainer.userService.getAllUsers();
      return successResponse(res, result);
    } catch (error) {
      return errorResponse(res, error);
    }
  };

  const updateUser = async (req, res) => {
    try {
      if (
        typeof req.body !== null &&
        req.body.hasOwnProperty("firstname") &&
        req.body.hasOwnProperty("lastname") &&
        req.body.hasOwnProperty("email") &&
        req.body.hasOwnProperty("password") &&
        req.body.hasOwnProperty("telephone")
      ) {
        const data = {
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          email: req.body.email,
          telephone: req.body.telephone,
          password: req.body.password,
          userId: req.user.id,
        };
        if (
          isEmpty(data.firstname) ||
          isEmpty(data.lastname) ||
          isEmpty(data.email) ||
          isEmpty(data.telephone) ||
          isEmpty(data.password)
        ) {
          return errorResponse(res, "Required fields cannot be empty");
        } else {
          const result = await serviceContainer.userService.userUpdate(data);
          return successResponse(res, result);
        }
      } else {
        return errorResponse(res, "Missing Required Fields", 400);
      }
    } catch (error) {
      return errorResponse(res, error);
    }
  };

  return {
    addUser,
    loginUser,
    getUsers,
    updateUser,
  };
};

module.exports = UserController;
