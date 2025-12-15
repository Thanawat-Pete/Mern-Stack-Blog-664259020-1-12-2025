const bcrypt = require('bcrypt');
const UserModel = require('../models/User.js');
const salt = bcrypt.genSaltSync(10);

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
        const user = await UserModel.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Error processing request' });
    }
};
