const dbconnect = require("./db/connection");
const dotenv = require("dotenv");
dotenv.config();
// const express = require("express");
// const app = express();
const start = async () => {
  try {
    await dbconnect(process.env.MONGO_URI);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = start;