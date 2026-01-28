// server/server.js

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// 1. Connect to Database (Wake up the DB)
require("./db/conn");

// 2. Initialize the App (Buy the Car) -- THIS MUST BE BEFORE "app.use"
const app = express();

const PORT = process.env.PORT || 5000;

// 3. Import Router
const router = require("./routes/router");

// 4. Middleware (Configure the Car)
app.use(cors());
app.use(express.json());
app.use(router); // Now 'app' exists, so we can use it!

// Basic Route
app.get("/", (req, res) => {
    res.send("Server is Running!");
});

// 5. Start the Server (Drive the Car)
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});