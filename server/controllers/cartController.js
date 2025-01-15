const Cart = require('../models/cartModuls');
const Product = require('../models/products');

exports.getUserCart = async (req,res)=>{
    try {
        const cart = await Cart.findOne({userId:req.user}).populate('products.productId');
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({error: error.message});

    }
}
exports.addToCart = async (req,res)=>{
    const {productId,quantity}=req.body
    const userId = req.user;
    try {
        let cart = await Cart.findOne({userId})
        if(!cart){
            cart= new Cart({
                userId,
                products:[]
            })
        }
        const productIndex = cart.products.findIndex((item => item.productId.toString()==productId));
        if (productIndex >-1){
            cart.products[productIndex].quantity+=quantity;
        }
        else {
            cart.products.push({productId,quantity});
        }
        await cart.save();
        res.status(200).json(cart);

    } catch (error) {
        res.status(500).json({error: error.message});

    }
}
