const express = require('express');
require('dotenv').config();
const {json} = require('body-parser');
const session = require('express-session');
const checkForSession = require('./middlewares/checkForSession');
const sc = require('./controllers/swag_controller');
const ac = require('./controllers/auth_controller');
const cc = require('./controllers/cart_controller');
const searchctrl = require('./controllers/search_controller');

const app = express();
const PORT = process.env.SERVER_PORT || 3000;

app.use(json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(checkForSession)
app.use(express.static(`${__dirname}/../build`));

app.get('/api/swag', sc.read);

app.post('/api/login', ac.login);

app.post('/api/register', ac.register);

app.post('/api/signout', ac.signout);

app.get('/api/user', ac.getUser);

app.post('/api/cart', cc.add);

app.post('/api/cart/checkout', cc.checkout);

app.delete('/api/cart', cc.delete);

app.get('/api/search', searchctrl.search);


app.listen(PORT, () => {console.log(`Listening on ${PORT}`)})