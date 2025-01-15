const express = require('express');
const cors = require('cors');
const  routes = express.Router();
const {verfyJwtToken} = require('../controllers/userController');
const {getUserCart,addToCart} = require('../controllers/cartController');

routes.get('/getCart',verfyJwtToken,getUserCart);
routes.post('/addToCart',verfyJwtToken,addToCart);

module.exports = routes;
