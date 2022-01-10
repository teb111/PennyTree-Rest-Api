const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;
const {
  validateEmail,
  validateTelephone,
  generateToken,
} = require("../utils/util");

const userService = () => {
  const newUser = async (data) => {
    const { firstname, lastname, email, password, telephone } = data;
    try {
      if (!validateEmail(email)) {
        throw new Error("Invalid Email");
      } else if (password.length < 6) {
        throw new Error("Password can not be less than 6 characters");
      } else if (!validateTelephone(telephone)) {
        throw new Error("Invalid telephone format");
      } else {
        const user = {
          firstname,
          lastname,
          email,
          password,
          telephone,
        };

        const checkUser = await User.findOne({ where: { email } });

        if (checkUser) {
          throw new Error("User already exists");
        } else {
          User.create(user)
            .then((data) => {
              return data;
            })
            .catch((err) => {
              throw new error(err);
            });
        }
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const userLogin = async (data) => {
    try {
      const { email, password } = data;
      if (!validateEmail(email)) {
        throw new Error("Invalid Email");
      } else {
        const user = await User.findOne({
          where: { email },
        });
        if (user && user.validatePassword(password)) {
          const result = {
            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            token: generateToken(user.id),
          };
          return result;
        } else {
          throw new Error("Invalid email or password");
        }
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const getAllUsers = async () => {
    try {
      let allUsers = [];
      const users = await User.findAll({
        attributes: { exclude: ["password"] },
      });
      allUsers.push(...users);
      return allUsers;
    } catch (error) {
      throw new Error(error);
    }
  };

  const userUpdate = async (data) => {
    try {
      const findUser = await User.findOne({ where: { id: data.userId } });
      if (findUser) {
        const result = await findUser.update({
          firstname: data.firstname,
          lastname: data.lastname,
          password: data.password,
          email: data.email,
          telephone: data.telephone,
          attributes: { exclude: ["password"] },
        });
        return "User Updated Succesfully";
      } else {
        throw new Error("User not Found");
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  return {
    newUser,
    userLogin,
    getAllUsers,
    userUpdate,
  };
};

module.exports = userService;
