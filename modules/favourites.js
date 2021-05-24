const { Flower, User } = require('./models');
const b ="";
exports.getFavourite = (request, response) => {
    //if (request.headers.authorization == null) {
    //    return response.status(401).send({
    //        message: 'verification failed'
    //    });
    //}

    // Check the token
    //const token = String(request.headers.authorization).split(' ').pop();
    //const tokenData = jwt.verify(token, SECRET);
    //const username = tokenData.username;
    User.find({username : "sam"}, (error, result) => {
        if(error){
            console.log("err")
        }else{
            for (let results of result) {
                const a = results.favourite.split(",");
                console.log(a.length);
                for (let f = 0;f < a.length;f++){
                    Flower.findOne({name : a[f]},(error,favourite) =>{
                        if(error){
                             return response.status(401).send({
                                 message: 'verification failed'
                            });
                         }else{
                            return response.send(favourite);
                         }
                     });
                 }
            }
        }
    });

}