const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Please enter your name'],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: true, 
        trim: true,
        lowercase: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please add a valid mail"
        ]
    },
    password: {
        type: String,
        required : [true, 'Please enter your password'],
        minlength: 6
    }
},{timestamps: true})

module.exports = mongoose.model('userModel', userSchema);