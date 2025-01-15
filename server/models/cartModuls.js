const mongoose = require('mongoose');

const catSchema = new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'users',required:true},
    products:[{
        productId:{type:mongoose.Schema.Types.ObjectId,ref:'products',required:true},
        quantity:{type:Number,default:1,required:true}
    }]
});
const Cart = mongoose.model('cart',catSchema);
module.exports = Cart;
