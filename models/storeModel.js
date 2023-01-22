const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema(
  {
    key: { type: String, required: true },
    value: [{ type: String, required: true }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: User },
    createdAt: { type: Date, default: Date.now, expires: 300 },
  },
  {
    timestamps: { createdAt: false, updatedAt: true },
  }
);

const Store = new mongoose.model("Store", storeSchema);

module.exports = Store;
