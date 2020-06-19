require("dotenv").config;
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

app.listen(5000, () => {
  console.log("App listening on 5000");
});

const router = require("./routes");
app.use("/utube", router);
