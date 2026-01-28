// server/models/userSchema.js

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
        trim: true
    },
    lname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!value.match(/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/)) {
                throw new Error('Email is not valid.');
            }
        }
    },
    mobile: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 10
    },
    gender: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ["Active", "InActive"]
    },
    profile: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    datecreated: {
        type: Date,
        default: Date.now
    }
});

// Create Model
const users = mongoose.model("users", userSchema);

module.exports = users;