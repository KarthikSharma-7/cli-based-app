const userModel = require("../models/userModel");
const generateToken = require("../middleware/generateToken");

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400).json({ Error: "All Fields Required" });
  }
  const userExists = await userModel.findOne({ email });
  if (userExists) {
    res.status(400).json({ Error: "User Already Exists" });
  }

  const newUser = await userModel.create({
    name,
    email,
    password,
  });

  if (newUser) {
    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
    });
  } else {
    res.status(400).json({ Error: "Failed To Create New User" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ Error: "All Fields Required" });
  }
  const user = await userModel.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: await generateToken(user._id),
    });
  } else {
    res.status(400).json({ Error: "Wrong Credentials" });
  }
};

module.exports = { registerUser, loginUser };
