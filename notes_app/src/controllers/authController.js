const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const register = async (req, res, next) =>{
    try{
        const {name, email, password} = req.body;
        if(!name || !email || !password){
            return res.status(400).json({message: "Missing input values"});
        }

        const isExisting = await User.findOne({email});
        if(isExisting){
            return res.status(409).json({message: "User already exists"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({name, email, hashedPassword});
        await newUser.save();

        return res.status(201).json({message: "User registered"});
    } catch(err){
        next(err);
    }

    const login = async (req, res, next) => {
        try{
            const {email, pwd} = req.body;
            if(!email || !pwd){
                return res.status(400).json({message: "Missing credentials"});
            }

            const userEmail = await User.findOne(email);
            if(!userEmail){
                return res.status(401).json({message: "Invalid credentials"});
            }

            const userPassword = await bcrypt.compare(pwd, newUser.password);
            if(!userPassword){
                return res.status(401).json({message: "Invalid credentials"});
            } 

            if (!process.env.JWT_SECRET) {
                throw new Error("JWT_SECRET not set in .env");
            }

            const payload = {id: newUser._id, email: newUser.email};
            const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN || '7d'});

            return res.json({token});
        } catch(err){
            next(err);
        }
    }

    module.exports = {register, login};
};