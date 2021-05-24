const mongoose = require('mongoose');

const MONGO_URL ="mongodb+srv://sam:pad07309@cluster0.awbs9.mongodb.net/FlowerDB2?retryWrites=true&w=majority";

mongoose.connect(MONGO_URL, {
    useNewUrlParser:true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });

module.exports = mongoose;
