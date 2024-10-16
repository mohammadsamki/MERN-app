const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productsRoutes');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
dotenv.config();

const app = express();
connectDB();

app.use(bodyParser.json());
app.use(cors());
app.use('/api',  userRoutes);
app.use('/api', productRoutes);

module.exports = app;
