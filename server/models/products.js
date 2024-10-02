const mongoose = require('mongoose');


const producSchema = new mongoose.Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
})

const Product = mongoose.model('products', producSchema);

module.exports = Product;
