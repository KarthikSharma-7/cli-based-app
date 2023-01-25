const mongoose = require("mongoose");
const storeModel = require("../models/storeModel");

const addToStore = async (req, res) => {
  const { key, value } = req.body;
  const userId = req.user._id;
  if (!key || !value) {
    return res.status(400).json({ Error: "Empty fields cannot be stored" });
  }
  const keyExists = await storeModel.findOne({ key, createdBy: userId });
  if (keyExists) {
    return res.status(400).json({ Error: "Key Already Exists" });
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

const updateToStore = async (req, res) => {
  const userId = req.user._id;
  const parameter = req.params.key;
  const body = req.body;
  if (!body) {
    return res.status(400).json({ Error: "Not Found" });
  }
  try {
    const updatedStore = await storeModel.findOneAndUpdate(
      { createdBy: userId, key: parameter },
      body,
      {
        new: true,
      }
    );
    if (updatedStore) {
      res.status(200).json({
        id: updatedStore._id,
        key: updatedStore.key,
        value: updatedStore.value,
      });
    } else {
      res.status(400).json({ Error: "Failed to Update" });
    }
  } catch (error) {
    return res.status(400).json({ Error: error });
  }
};

const getFromStore = async (req, res) => {
  const userId = req.user._id;
  const key = req.params.key;
  try {
    const pair = await storeModel.find({ createdBy: userId, key });
    if (pair) {
      return res.status(200).json({ Data: pair });
    } else {
      return res.status(400).json({ Error: "Not Found" });
    }
  } catch (err) {
    res.status(400).json({ Error: err });
  }
};

const deleteFromSTore = async (req, res) => {
  const userId = req.user._id;
  const parameter = req.params.key;
  try {
    const deletedStore = await storeModel.findOneAndDelete({
      createdBy: userId,
      key: parameter,
    });
    if(deletedStore){
      return res.status(200).json({
        Data:"Successfully deleted"
      });
    }
    else{
      return res.status(400).json({Error:"Failed to Delete"})
    }
  } catch (err) {
    res.status(400).json({Error:err})
  }
};

const getAllPairs = async (req, res) => {
  const userId = req.user._id;
  try {
    const allPairs = await storeModel.find({ createdBy: userId });
    if (allPairs) {
      return res.status(200).json({ Data: allPairs });
    } else {
      return res.status(400).json({ Error: "Not Found" });
    }
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
