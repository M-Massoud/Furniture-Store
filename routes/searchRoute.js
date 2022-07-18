const express = require("express");
const mongoose = require("mongoose");

require('../models/productModel');
let Product = mongoose.model("products");
const router = express.Router();
router
  .route("/search/:key")
.get(
    async (req,res)=>{
    console.log(req.params.key)

    let data = await Product.find(
        {
            "$or":[
                {name:{$regex:req.params.key}},
                
            ]
        }
    )
    res.send(data);

})

module.exports = router;

