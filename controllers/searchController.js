const mongoose = require("mongoose");
require('../models/productModel');
let Product = mongoose.model("products");


module.exports.searchProducts=
    async (req,res)=>{
        console.log(req.params.key)
    
        let data = await Product.find(
            {
                "$or":[
                    {name:{$regex:req.params.key}}
                ]
            }
        )
        res.send(data);}
