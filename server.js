const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const port = process.env.PORT;

const mongoConnection = require("./config/db");

const userRouter = require("./routes/userRoutes");

app.use(express.json());
app.use(cors());

mongoConnection();

app.use("/api/user", userRouter);

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
