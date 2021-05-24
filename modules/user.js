const { User } = require('./models');
const jwt = require('jsonwebtoken');

const SECRET = "thisismynewproject";
exports.register = async (request, response) => {
        const user = User.fundOne({
            username:request.body.username
        });
        if (user) {
            return response.status(422).send({
                message: 'Username already used'
            });
        } else {
            User.create({
                username: request.body.username,
                password: request.body.password
            });
            return response.send({
                message:'successfully'
            });
        }
    }
exports.login = async(request, response) =>{
    const user = await User.findOne({
        username: request.body.username
    });
    if (!user) {
        return response.status(422).send({
            message: 'Wrong username'
        });
    }
    if (request.body.password == user.password){

    const token = jwt.sign({id: String(user.username)}, SECRET, { expiresIn: '5 day' });

    return response.send({ username: user.username, token: token });
    }else{
        return response.status(422).send({
            message: 'Wrong password'
        });
    }
}
exports.changePassword = async (request, response) => {
    const user = request.user;
    if (request.body.password != user.password){
        return response.status(422).send({
            message: 'Wrong password'
        });
    }
    await User.updateOne({ _id: user._id }, { password:request.body.newPassword}, (error, result) => {
        if (error) {
            return response.status(400).send({
                message: 'not successfully to change password,place try again'
            });
        } else {
            return response.send({
                message: 'Successfully change password'
            });
        }
    });
}

exports.checkauth = async (request, response, next) => {
    // The header does not include authorization
    if (request.headers.authorization == null) {
        return response.status(401).send({
            message: 'verification failed'
        });
    }

    // Check the token
    const token = String(request.headers.authorization).split(' ').pop();
    const tokenData = jwt.verify(token, SECRET);
    const username = tokenData.username;
    User.findOne({username : username}), (error, result) => {
        if(error){
            return response.status(401).send({
                message: 'verification failed'
            });
        }else{
            request.user = result;
            next();
        }
    }
} 


