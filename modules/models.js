const mongoose = require('./database');

const FlowerSchema = new mongoose.Schema({
    id : String,
    description:String,
});
const UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

const Flower = mongoose.model('FlowerName', FlowerSchema, 'FlowerName');
const User = mongoose.model('User', UserSchema,'User');

module.exports = { Flower, User };


