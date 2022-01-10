const { errorResponse } = require("../responses");
const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.users;

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findOne({
        where: { id: decoded.id },
        attributes: { exclude: ["password"] },
      });
      req.user = user.dataValues;
      console.log(req.user);
      next();
    } catch (err) {
      errorResponse(res, "Not Authorized token failed, Please Log in Again");
    }
  }
};

module.exports = protect;
