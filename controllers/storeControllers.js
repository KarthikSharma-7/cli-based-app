const mongoose = require("mongoose");
const storeModel = require("../models/storeModel");

const addToStore = async (req, res) => {
  const { key, value } = req.body;
  if (!key || !value) {
    return res.status(400).json({ Error: "Empty fields cannot be stored" });
  }
  const newRecord = await storeModel.create({
    key,
    value,
    createdBy: req.user,
  });

  if (newRecord) {
    res.status(201).json({
      _id: newRecord._id,
      key: newRecord.key,
      value: newRecord.value,
      name: req.user.name,
    });
  } else {
    res.status(400).json({ Error: "Failed to store a record" });
  }
};

const updateToStore = async () => {};

const getFromStore = async (req, res) => {
  const userId = req.user._id;
  const key = req.params.key;
  try {
    const pair = await storeModel.find({ createdBy: userId, key });
    return res.status(200).json({ Data: pair });
  } catch (err) {
    res.status(400).json({ Error: err });
  }
};

const deleteFromSTore = async () => {};

const getAllPairs = async (req, res) => {
  const userId = req.user._id;
  try {
    const allPairs = await storeModel.find({ createdBy: userId });
  return res.status(200).json({ Data: allPairs });
  } catch (error) {
    res.status(400).json({ Error: err });
  }
  
};

module.exports = {
  addToStore,
  updateToStore,
  getAllPairs,
  getFromStore,
  deleteFromSTore,
};
