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

// route - POST /api/auth/register
const register = async(req, res) => {
    try{
        const {name, email, password} = req.body;

        const userExits = await User.findOne({email}); // A Promise object is truthy
        if(userExits){
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({ // Creating user
            name: name,
            email:email,
            password: hashedPassword
        });

        const token = generateToken(user._id); // _id is a primary key in the MongoDB

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error){
        console.error("Registration error: ", error);
        res.status(500).json({
            success: false,
            message: "Error occured while user registration"
        })
    } 
    
};

// route - POST /api/auth/login
const login = async(req, res) => {
    try{
        const {email, password} = req.body;

        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({
                success: false,
                message: "User not found"
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ 
                success: false,
                message: 'Invalid credentials' 
            });
        }

        const token = generateToken(user._id);
        res.status(201).json({
            success: true,
            message: "Login Successfull",
            token,
            user:{
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch(error){
        console.error('Login error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Server error during login' 
        });
    }
};

module.exports = { register, login };