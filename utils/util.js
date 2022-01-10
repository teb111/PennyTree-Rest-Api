const jwt = require("jsonwebtoken");

const isEmpty = (str) => {
  return !str || str.length === 0;
};

// it will generate a token alongside the user's id
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d", // setting the token to expire in 1 day
  });
};

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const validateTelephone = (telephone) => {
  const phone = /^[+]*[(]{0,2}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g.test(telephone);
  return phone;
};

module.exports = { isEmpty, generateToken, validateEmail, validateTelephone };
