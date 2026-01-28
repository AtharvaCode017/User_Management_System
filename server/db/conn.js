const mongoose = require("mongoose");

const DB = process.env.DATABASE;

mongoose.connect(DB)
    .then(() => console.log("Cloud Database Connected Successfully"))
    .catch((err) => console.log("Error Connecting to Database:", err));