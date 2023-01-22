const userModel = require("../models/userModel");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const validateToken = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(400).json({ Error: "Require Login" });
  }
  const token = authorization.replace("Bearer ", "");
  await jwt.verify(authorization, process.env.JWT_KEY, async (err, payload) => {
    if (err) {
      return res.status(400).json({ Error: "Require Login" });
    }
    const { _id } = payload;
    const userInfo = await userModel.findOne({ _id });
    userInfo.password = undefined;
    req.user = userInfo;
    next();
  });
};

module.exports = validateToken;
