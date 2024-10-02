const express = require('express');
const cors = require('cors');
const routes = express.Router();
require('dotenv').config();
const {getUsers,createUser,getUsersNames,deleteUser} = require('../controllers/userController');
routes.get('/users',getUsers);
routes.post('/users',createUser);
routes.delete('/users/:id',deleteUser);
routes.get('/users/names',getUsersNames);

module.exports = routes;
