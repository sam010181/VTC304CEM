const mongoose = require('./database');

const FlowerSchema = new mongoose.Schema({
    id : String,
    description:String,
});
const UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

const Flowermodel = mongoose.model('FlowerName', FlowerSchema, 'FlowerName');
const Usermodel = mongoose.model('User', UserSchema,'User');

module.exports = { Flowermodel, Usermodel };


