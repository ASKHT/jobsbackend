const express = require("express");
const app = express();
const start = require("./server.js");
const cors=require('cors');
const dotenv=require('dotenv')
dotenv.config()
const authrouter=require("./routes/auth.route")
const jobsrouter=require("./routes/jobs.route")
    
app.use(express.json())
app.use(cors())
app.use("/api/v1/auth", authrouter);
app.use("/api/v1/jobs",jobsrouter)
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      start();
      console.log(`Server is running on port ${PORT}`);
      console.log("database connected");
    });
module.exports = app;
