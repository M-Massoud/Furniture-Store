const mongoose = require('mongoose');
require('../models/subCategoryModel');
const { body } = require('express-validator');

let subCategory = mongoose.model('subCategory');

module.exports.getAllsubCategories = async (request, response) => {
  try {
    const maxItemsNumberInPage = Number(request.query.itemCount) <= 20 ? Number(request.query.itemCount) : 10;

    const numberOfSubCategories = await subCategory.count();
    const maxPagesNumber = Math.ceil(numberOfSubCategories / maxItemsNumberInPage);
    const requestedPageNumber = Number(request.query.page) <= maxPagesNumber ? Number(request.query.page) || 1 : maxPagesNumber;

    const subCategories = await subCategory.find().populate({ path: 'products', select: 'name price' }).skip((requestedPageNumber - 1) * maxItemsNumberInPage).limit(maxItemsNumberInPage);

    response
      .status(200)
      .json({ resData: { maxPagesNumber: maxPagesNumber, subCategories: subCategories } });
  } catch (error) {
    next(error);
  }

};

module.exports.getsubCategoryById = (request, response, next) => {
  subCategory
    .findOne({ _id: request.params.id })
    .populate({ path: 'products', select: 'name description price discount' })
    .then(data => {
      if (data == null) next(new Error('subCategory not found'));
      response.status(200).json(data);
    })
    .catch(error => {
      next(error);
    });
};

module.exports.createsubCategory = (request, response, next) => {
  let object = new subCategory({
    title: request.body.title,
    products: request.body.products,
  });
  object
    .save()
    .then(data => {
      response.status(201).json({ message: 'added successfully', data });
    })
    .catch(error => {
      console.log('errror' + error);
      next(error);
    });
};

module.exports.updatesubCategory = async (request, response, next) => {
  // console.log(request.body.id);
  try {
    const data = await subCategory.findOne({ _id: request.body.id });

    for (let key in request.body) {
      console.log(key);
      if (request.body[key].constructor.name == 'Array') {
        for (let item in request.body[key]) {
          data[key].push(request.body[key][item]);
        }
      } else data[key] = request.body[key];
    }

    await data.save();

    response.status(200).json({ data: 'sub Category Updated Successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports.deletesubCategory = (request, response, next) => {
  subCategory
    .deleteOne({ _id: request.params.id }, {})
    .then(data => {
      if (data == null) {
        next(new Error('needed sub category not found'));
      } else
        response
          .status(200)
          .json({ data: 'sub category Deleted Successfully' });
    })
    .catch(error => {
      next(error);
    });
};
