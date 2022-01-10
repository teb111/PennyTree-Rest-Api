const bcrypt = require("bcryptjs");
module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    firstname: {
      type: Sequelize.STRING,
    },
    lastname: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    telephone: {
      type: Sequelize.STRING,
    },
  });

  async function generateHash(user) {
    if (user === null) {
      throw new Error("No User Found");
    } else if (!user.changed("password")) return user.password;
    else {
      let salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    }
  }

  User.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };

  User.beforeCreate(generateHash);

  User.beforeUpdate(generateHash);

  return User;
};
