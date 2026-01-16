const bcrypt = require('bcrypt');
const UserModel = require('../models/User.js');
const jwt = require('jsonwebtoken');
const salt = bcrypt.genSaltSync(10);
require('dotenv').config();
const secret = process.env.SECRET;

exports.registerUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        if(!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }
        const existingUser = await UserModel.findOne({ username });
        if (existingUser) {
            return res.status(409).json({ message: 'Username already exists' });
        }
        try {
            const hashedPassword = bcrypt.hashSync(password, salt);
            const newUser = await UserModel.create({ username, password: hashedPassword });
            await newUser.save();
            res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message || 'Error creating user' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message || 'Error processing request' });
    }
};

exports.loginUser = async (req, res) => {
    const { username, password } = req.body;
    if(!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }
    try {
        const userDoc = await UserModel.findOne({ username });
        if(!userDoc) {
            return  res.status(401).json({ message: 'User not found!' });
        }
        const isPasswordMatch = bcrypt.compareSync(password, userDoc.password);
        if(!isPasswordMatch) {
            return res.status(401).json({ message: 'Invalid password!' });
        } 
        jwt.sign({username, id: userDoc._id}, secret, {}, (err, token)=>{
            if(err) {
                res.status(500).json({ message: 'Internal server error: Authentication failed!' });
            }
        res.send({message: 'Login successful', id: userDoc._id, user: username, accessToken: token});
        })
    } catch (error) {
        res.status(500).json({ message: error.message || 'Error processing request' });
    }
};
