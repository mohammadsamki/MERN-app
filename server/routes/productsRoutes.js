const express = require('express');
const cors = require('cors');
const routes = express.Router();
require('dotenv').config();
const {getProducts,productRange,updateProduct,getProductById} = require('../controllers/productControler');
routes.get('/products',getProducts);
routes.post('/products/range',productRange);
routes.put('/products/:id',updateProduct);
routes.get('/products/:id',getProductById);


module.exports = routes;
