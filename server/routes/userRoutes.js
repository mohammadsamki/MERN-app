const express = require('express');
const cors = require('cors');
const  routes = express.Router();
require('dotenv').config();
const {getUsers,createUser,getUsersNames,deleteUser,updateUser,userLogin,verfyJwtToken,home} = require('../controllers/userController');
routes.get('/users',getUsers);
routes.post('/users',createUser);
routes.delete('/users/:id',deleteUser);
routes.get('/users/names',getUsersNames);
routes.put('/users/:id',updateUser);
routes.post('/login',userLogin);
routes.get('/jwt',verfyJwtToken);
routes.get('/home',verfyJwtToken,home);

module.exports = routes;
