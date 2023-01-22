const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = async (id) => {
  return jwt.sign({ id }, `${process.env.JWT_KEY}`, {
    expiresIn: "60m",
  });
};

module.exports = generateToken;
