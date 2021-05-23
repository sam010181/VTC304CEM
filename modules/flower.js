const { flowermodel, Usermodel } = require('./models');

exports.getRecipe = (request, response) => {
    flowermodel.find({}, (error, flower) => {
	if(error){
        return response.status(400).send({
            message: 'Error'
        });
	}else{
        return response.send(flower);
	}
});
}

