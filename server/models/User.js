const mongoose = require('mongoose');
const { use } = require('react');
const { Schema } = mongoose;

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const UserModel = model(user, userSchema);
module.exports = UserModel;