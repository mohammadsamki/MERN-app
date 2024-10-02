const Product = require('../models/products')


exports.getProducts = async (req,res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
//  post route access body and taker the low and max price
exports.productRange = async (req, res) => {
    try{
        const lowPrice = req.body.lowPrice;
        const maxPrice = req.body.maxPrice;
        console.log(lowPrice, maxPrice);
        const products = await Product.find({price: {$gt: lowPrice, $lt: maxPrice}});
        console.log(products);
        res.status(200).json(products)
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}


exports.updateProduct = async (req, res) => {
    try {
        const id= req.params.id;
        const body = req.body;
        console.log(body);
        const productToUpdate = await Product.findByIdAndUpdate(id, body, {new: true});
        res.status(200).json(productToUpdate)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
exports.getProductById= async (req,res)=>{
    try {
        const id= req.params.id;


        const productToUpdate = await Product.findOne({_id: id}  );
        // const productToUpdate = await Product.findById( id  );
        res.status(200).json(productToUpdate)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
