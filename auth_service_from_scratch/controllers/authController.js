const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const generateToken = (userId) => {
    return jwt.sign(
        {id: userId},
        process.env.JWT_SECRET,
        {expiresIn: JWT_EXPIRES_IN}
    );
};

const register = async(req, res) => {
    try{
        const {name, email, password} = req.body;

        const userExits = await User.findOne({email});
        if(userExits){
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

    } catch (error){

    }
};