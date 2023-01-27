const mongoose = require("mongoose");
const User = require("./userModel");

const storeSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true },
    value: [{ type: String, required: true }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: User },
    createdAt: { type: Date, default: Date.now, index: { expires: 86400 } },
  },
  {
    timestamps: { createdAt: false, updatedAt: true },
  }
);

const Store = new mongoose.model("Store", storeSchema);

module.exports = Store;
