const dotenv = require("dotenv");
dotenv.config({});

module.exports = {
  MONGODB_URL: process.env.MONGODB_URL,
  PORT: process.env.PORT,
  DEV_MODE: process.env.DEV_MODE,
  JWT_SECRET: process.env.JWT_SECRET,
};
