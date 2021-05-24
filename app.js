const express = require('express');
const cors = require('cors');
const Flower = require('./modules/flower');
const user = require('./modules/user');
const favourite = require('./modules/favourites');
//const comment = require('./modules/comments');
const app = express();
const port = process.env.PORT || 8080;


//app.use(express.json());
//app.use(cors());

app.get('/api/flower', Flower.getFlower);
app.get('/api/flower/id/:id',Flower.getFlowerByID);
app.get('/api/flower/name/:name',Flower.getFlowerByName);

app.post('/api/register/name/:name/password/:password', user.register);
app.post('/api/login', user.login);
app.put('/api/user/Changepassword', user.changePassword);

app.get('/api/favourite',favourite.getFavourite);
//app.put('/api/v1/favourite/:id', user.auth, favourite.addFavourite);
//app.delete('/api/v1/favourite/:id', user.auth, favourite.deleteFavourites);

app.listen(port, () => {
    console.log(`App running on port ${port}`);
});