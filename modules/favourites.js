const { Flower, User } = require('./models');

exports.getFavourite = (request, response) => {
    const user = request.user;
    User.findOne({ username: user.username }, (error, result) => {
        if (error) {
            console.log(error);
        } else {
            if (result.favourite == null) { // No favorites
                return response.send([]);
            } else {
                return response.send(result.favourite);
            }
        }
    }).populate('favourite');   
}
exports.addFavourite = (request, response) => {
    const user = request.user;
    const id = request.params.id;

    // Check if the ID exists
    Flower.findOne({ _id: id }, (error, result) => {
        if (error) {
            return response.status(400).send({
                message: 'ID format error'
            });
        } else {
            if (result) {
                
                // Add the ID to database
                User.updateOne({ username: user.username }, { $addToSet: { favourite: id } }, (error, result) => {
                    if (error) {
                        return response.status(400).send({
                            message: 'Error'
                        });
                    } else {
                        if (result.nModified) {
                            return response.send({
                                message: 'Added successfully'
                            });
                        } else {
                            return response.status(400).send({
                                message: 'Already added to favorites'
                            });
                        }
                    }
                });
            } else {
                return response.status(400).send({
                    message: 'ID does not exist'
                });
            }
        }
    });
}
exports.deleteFavourites = (request, response) => {
    const user = request.user;
    const id = request.params.id;

    // Delete the ID from database
    User.updateOne({ username: user.username }, { $pull: { favourite: id } }, (error, result) => {
        if (error) {
            return response.status(400).send({
                message: 'ID format error'
            });
        } else {
            if (result.nModified) {
                return response.send({
                    message: 'Deleted successfully'
                });
            } else {
                return response.status(400).send({
                    message: 'Already deleted from favorite'
                });
            }
        }
    });
}
