const mongoose = require('mongoose');
require('./../models/productModel');
let Products = mongoose.model('products');

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
  let newProduct = new Products({
    description: request.body.description,
    name: request.body.name,
    stockAmount: request.body.stockAmount,
    price: request.body.price,
    'subCategory.id': request.body.subCategory.id,
    'subCategory.title': request.body.subCategory.title,
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
      if (data == null) next(new Error(' needed product cannot be deleted'));
      response.status(200).json('product deleted successfully' + data);
    })
    .catch(error => {
      next(error);
    });
};
