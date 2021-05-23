const mongoose = require('./database');

const FlowerSchema = new mongoose.Schema({
    id : String,
    description:String,
});

const Flower = mongoose.model('FlowerName', FlowerSchema, 'FlowerName');


Flower.find({}, (error, result) => {
	if(error){
	   console.log("error")
	}else{
	   console.log(result)
	}
});
