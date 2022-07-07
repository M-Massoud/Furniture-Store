const mongoose = require('mongoose');
require('./../models/productModel');
let Products = mongoose.model('products');
const fs = require('fs');
const { unlink } = require('node:fs/promises');
const path = require('path');

module.exports.getAllProducts = (request, response, next) => {
  Products.find({})
    .then(data => {
      response.status(200).json(data);
    })
    .catch(error => {
      next(error);
    });
};

module.exports.addNewProduct = (request, response, error) => {
  // console.log(request.file);
  let newProduct = new Products({
    name: request.body.name,
    description: request.body.description,
    stockAmount: request.body.stockAmount,
    price: request.body.price,
    'subCategory.id': request.body.subCategory.id,
    'subCategory.title': request.body.subCategory.title,
    image: request.file?.filename || '9b6c508fb75323001928cdd089bc14eb',
  });
  newProduct
    .save()
    .then(data => {
      response.status(201).json({ data });
    })
    .catch(error => {
      console.log('errror' + error);
      next(error);
    });
};

module.exports.updateProduct = async (request, response, next) => {
  try {
    let data = await Products.findOne({ _id: request.body.id });
    for (let key in request.body) {
      // check if key is object type
      if (request.body[key].constructor.name == 'Object') {
        for (let item in request.body[key]) {
          data[key][item] = request.body[key][item];
        }
      } else {
        data[key] = request.body[key];
      }

      //to update image
      data.image = request.file?.filename || data.image;

      await data.save();
      response.status(200).json({ data: 'product updated successfully' });
    }
  } catch (error) {
    next(error);
  }
};

module.exports.getSpecificProduct = (request, response, next) => {
  Products.find({ _id: request.params.id })
    .then(data => {
      response.status(200).json(data);
    })
    .catch(error => {
      next(error);
    });
};

module.exports.deleteProduct = (request, response, next) => {
  Products.findByIdAndDelete({ _id: request.params.id })

    .then(data => {
      // console.log(data.image);

      // `./uploads/products-imgs/${data.image}`

      productImgPath = path.join(
        __dirname,
        '..',
        'uploads',
        'products-imgs',
        data.image
      );
      console.log(productImgPath);

      fs.unlinkSync(productImgPath);
      if (data == null) next(new Error(' needed product cannot be deleted'));
      response
        .status(200)
        .json({ message: 'product deleted successfully', data });
    })
    .catch(error => {
      next(error);
    });
};
