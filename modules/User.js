const { Usermodel } = require('./models');

exports.register = async (request, response) => {
        const user = User.fundOne({
            username:request.body.username
        });
        if (user) {
            return response.status(422).send({
                message: 'Username already exists'
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
            message: 'Username does not exist'
        });
    }
    if (request.body.password == user.password){

    
    const token = jwt.sign({
        id: String(user._id),
    }, SECRET, { expiresIn: '7d' });

    return response.send({ id: user._id, token: token });
    }else{
        return response.status(422).send({
            message: 'Incorrect password'
        });
    }
}
exports.changePassword = async (request, response) => {
    const user = request.user;
    if (request.body.password != user.password){
        return response.status(422).send({
            message: 'wrong password'
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


