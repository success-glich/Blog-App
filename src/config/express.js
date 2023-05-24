const express = require("express");
const routes = require("../router");
const cors = require("cors");
const morgan = require("morgan");
const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use("/api/v1", routes);
7;

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Node Server",
  });
});

// app.use("/api/v1");

module.exports = app;
