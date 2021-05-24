const express = require('express');
const cors = require('cors');
const Flower = require('./modules/flower');
const user = require('./modules/user');
const favourite = require('./modules/favourites');
//const comment = require('./modules/comments');
const app = express();
const port = process.env.PORT || 8080;


app.use(express.json());
app.use(cors());

app.get('/api/flower', Flower.getFlower);
app.get('/api/flower/id/:id',Flower.getFlowerByID);
app.get('/api/flower/name/:name',Flower.getFlowerByName);

app.post('/api/register/',user.register);
app.post('/api/login',user.login);
app.put('/api/user/Changepassword', user.checkauth,user.changePassword);

app.get('/api/favourite',user.checkauth,favourite.getFavourite);
app.put('/api/favourite/:id', user.checkauth, favourite.addFavourite);
app.delete('/api/favourite/:id', user.checkauth, favourite.deleteFavourites);

app.listen(port, () => {
    console.log(`App running on port ${port}`);
});