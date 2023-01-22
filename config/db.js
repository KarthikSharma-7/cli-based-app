const mongoose = require("mongoose");
require("dotenv").config();

const mongoConnection = () => {
  mongoose
    .connect(`${process.env.URL}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((res) => {
      console.log(`Connected to Database`);
    })
    .catch((e) => {
      console.log("Error===>", e);
    });
};

module.exports = mongoConnection;
