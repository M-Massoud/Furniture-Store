const mongoose = require('mongoose');
require('./../models/productModel');
let Products = mongoose.model('products');
const fs = require('fs');
const { unlink } = require('node:fs/promises');
const path = require('path');

module.exports.getAllProducts = async (request, response, next) => {
  try {
    let filterRange = '';
    let filterObject = {};

    if (request.query.filterBy && request.query.filterRange) {
      // to test it in postman change the next line to this 'filterRange = JSON.stringify(request.query.filterRange);'
      filterRange = request.query.filterRange;
      filterRange = filterRange.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
      filterObject[request.query.filterBy] = JSON.parse(filterRange);
    }

    // pagination
    const maxItemsNumberInPage = Number(request.query.itemCount);

    const numberOfProducts = await Products.find(filterObject).count();
    const maxPagesNumber = Math.ceil(numberOfProducts / maxItemsNumberInPage || 1);
    const requestedPageNumber =
      Number(request.query.page) <= maxPagesNumber
        ? Number(request.query.page) || 1
        : maxPagesNumber;

    const products = await Products.find(filterObject)
      .skip(((requestedPageNumber >= 1 ? requestedPageNumber : 1) - 1) * maxItemsNumberInPage)
      .limit(maxItemsNumberInPage);

    response.status(200).json({
      resData: { maxPagesNumber: maxPagesNumber, products: products },
    });
  } catch (error) {
    next(error);
  }
};

module.exports.addNewProduct = (request, response, next) => {
  // console.log(request.file);
  let newProduct = new Products({
    name: request.body.name,
    description: request.body.description,
    stockAmount: request.body.stockAmount,
    price: request.body.price,
    discount: request.body.discount,
    'subCategory.id': request.body.subCategory.id,
    'subCategory.title': request.body.subCategory.title,
    image:
      request.file?.filename || request.body.image || 'default-product-img.jpg',
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
    for (const key in request.body) {
      if (typeof request.body[key] == 'object') {
        for (let item in request.body[key]) {
          data[key][item] = request.body[key][item];
        }
      } else data[key] = request.body[key];
    }

    let oldImage = data.image;
    //to update image
    data.image = request.file?.filename || request.body.image || data.image;

    if (oldImage != data.image && oldImage !== "default-product-img.jpg" ) {
      // delete the old image
      productImgPath = path.join(
        __dirname,
        '..',
        'uploads',
        'products-imgs',
        oldImage
      );
      // console.log(productImgPath);
      fs.unlinkSync(productImgPath);
    }
    await data.save();

    response.status(200).json({ data: 'product updated successfully' });
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

      // delete the image
      if(data.image !== "default-product-img.jpg"){
      productImgPath = path.join(
        __dirname,
        '..',
        'uploads',
        'products-imgs',
        data.image
      );
      // console.log(productImgPath);

      fs.unlinkSync(productImgPath); 
      }

      if (data == null) next(new Error(' needed product cannot be deleted'));
      response
        .status(200)
        .json({ message: 'product deleted successfully', data });
    })
    .catch(error => {
      next(error);
    });
};

////////////////////////////////////////////////
// sorting //

// highprice
module.exports.sortHighPriceProducts = async (request, response, next) => {
  try {
    const maxItemsNumberInPage =
      Number(request.query.itemCount) <= 20
        ? Number(request.query.itemCount)
        : 10;

    const numberOfProducts = await Products.count();
    const maxPagesNumber = Math.ceil(numberOfProducts / maxItemsNumberInPage);
    const requestedPageNumber =
      Number(request.query.page) <= maxPagesNumber
        ? Number(request.query.page) || 1
        : maxPagesNumber;

    const products = await Products.find().sort({ price: -1 })
      .skip((requestedPageNumber - 1) * maxItemsNumberInPage)
      .limit(maxItemsNumberInPage);

    response.status(200).json({
      resData: { maxPagesNumber: maxPagesNumber, products: products },
    });
  } catch (error) {
    next(error);
  }
};

//lowprice
module.exports.sortLowPriceProducts = async (request, response, next) => {
  try {
    const maxItemsNumberInPage =
      Number(request.query.itemCount) <= 20
        ? Number(request.query.itemCount)
        : 10;

    const numberOfProducts = await Products.count();
    const maxPagesNumber = Math.ceil(numberOfProducts / maxItemsNumberInPage);
    const requestedPageNumber =
      Number(request.query.page) <= maxPagesNumber
        ? Number(request.query.page) || 1
        : maxPagesNumber;

    const products = await Products.find().sort({ price: 1 })
      .skip((requestedPageNumber - 1) * maxItemsNumberInPage)
      .limit(maxItemsNumberInPage);

    response.status(200).json({
      resData: { maxPagesNumber: maxPagesNumber, products: products },
    });
  } catch (error) {
    next(error);
  }
};

//A to Z Sort
module.exports.sortProductsNameFromAtoZ = async (request, response, next) => {
  try {
    const maxItemsNumberInPage =
      Number(request.query.itemCount) <= 20
        ? Number(request.query.itemCount)
        : 10;

    const numberOfProducts = await Products.count();
    const maxPagesNumber = Math.ceil(numberOfProducts / maxItemsNumberInPage);
    const requestedPageNumber =
      Number(request.query.page) <= maxPagesNumber
        ? Number(request.query.page) || 1
        : maxPagesNumber;

    const products = await Products.find().sort({ name: 1 })
      .skip((requestedPageNumber - 1) * maxItemsNumberInPage)
      .limit(maxItemsNumberInPage);

    response.status(200).json({
      resData: { maxPagesNumber: maxPagesNumber, products: products },
    });
  } catch (error) {
    next(error);
  }
};

//Z to A Sort
module.exports.sortProductsNameFromZtoA = async (request, response, next) => {
  try {
    const maxItemsNumberInPage =
      Number(request.query.itemCount) <= 20
        ? Number(request.query.itemCount)
        : 10;

    const numberOfProducts = await Products.count();
    const maxPagesNumber = Math.ceil(numberOfProducts / maxItemsNumberInPage);
    const requestedPageNumber =
      Number(request.query.page) <= maxPagesNumber
        ? Number(request.query.page) || 1
        : maxPagesNumber;

    const products = await Products.find().sort({ name: -1 })
      .skip((requestedPageNumber - 1) * maxItemsNumberInPage)
      .limit(maxItemsNumberInPage);

    response.status(200).json({
      resData: { maxPagesNumber: maxPagesNumber, products: products },
    });
  } catch (error) {
    next(error);
  }
};

module.exports.updateProductStockAmount = async (request, response, next) => {
  try {
    let data = await Products.updateOne({ _id: request.body.id },{$set:{stockAmount:request.body.stockAmount}});
    response.status(200).json({ data: 'product stock amount updated successfully' });
  } catch (error) {
    next(error);
  }
};