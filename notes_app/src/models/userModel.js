const mongoose = require("mongoose");

// defining the user schema
const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true, lowercase: true}, 
    password: {type: String, required: true}
}, {timestamps: true});

module.exports = mongoose.model("User", userSchema);