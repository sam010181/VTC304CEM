const { Flower, User } = require('./models');

function checkFavourites(request, response, flowers) {
    const SECRET = "thisismynewproject";
    const token = String(request.headers.authorization).split(' ').pop();
    const tokenData = require('jsonwebtoken').verify(token, SECRET);
    const username = tokenData.username;
    User.findOne({ username: username }, (error, result) => {
        if (error) {
            return response.status(400).send({
                message: 'Error'
            });
        } else {
            if (result.favourites == null) {
                for (let flower of flowers) {
                    flower.isFavourite = false;
                }
                return response.send(flowers);
            } else {
                const array = result.favourites.split(",");
                for (let flower of flowers) {
                    for (let i = 0; i < array.length; i++) {
                        if (flower.name == array[i]) {
                            flower.isFavourite = true;
                        } else {
                            if (flower.isFavourite != true) {
                                flower.isFavourite = false;
                            }
                        }
                    }
                }
                return response.send(flowers);
            }
        }
    });
} 


exports.getFlower = (request, response) => {
    Flower.find({}, (error, Flowers) => {
	if(error){
        return response.status(400).send({
            message: 'Error'
        });
	}else{
        if (request.headers.authorization != null) {
            return checkFavourites(request, response,Flowers);
        }else{
        return response.send(Flowers);
        }
	}
});
}
exports.getFlowerByID = (request, response) => {
    Flower.findById(request.params.id, (error, Flowers) => {
        if (error) {
            return response.status(400).send({
                message: 'ID format error'
            });
        } else {
            if (Flowers == null) {
                return response.status(400).send({
                    message: 'No result'
                });
            } else {
                if (request.headers.authorization != null) {
                    return checkFavourites(request, response,Flowers);
                }else{
                    return response.send(Flowers);
                }
            }
        }
    });
}
exports.getFlowerByName = (request, response) => {
    // Search recipes from the database by keywords
    Flower.find({ name: new RegExp(request.params.name, "i") }, (error, Flowers) => {
        if (error) {
            return response.status(400).send({
                message: 'Error'
            });
        } else {
            if (Flowers.length == 0) {
                return response.status(400).send({
                    message: 'No result'
                });
            } else {
                if (request.headers.authorization != null) {
                    return checkFavourites(request, response,Flowers);
                }else{
                    return response.send(Flowers);
                }
            }
        }
    }).lean();
}
