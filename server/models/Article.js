const mongoose = require('mongoose');
const { Schema } = mongoose;
const UserModel = require('./User');

const articalSchema = new Schema({
    title: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    cover: { type: String, required: true },
    summary: { type: String, required: true },
    content: { type: String, required: true },
}, 
    { 
        timestamps: true 
    }
);

const ArticleModel = mongoose.model(articalSchema);
module.exports = ArticleModel;