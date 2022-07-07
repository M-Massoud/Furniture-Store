const mongoose = require('mongoose');
require('../models/subCategoryModel');
const { body } = require('express-validator');

let subCategory = mongoose.model('subCategory');

module.exports.getAllsubCategories = (request, response) => {
  // console.log(request.query);
  // console.log(request.params);
  subCategory
    .find({})
    .populate({ path: 'products', select: 'name price' })
    .then(data => {
      response.status(200).json(data);
    })
    .catch(error => {
      next(error);
    });
};

module.exports.getsubCategoryById = (request, response, next) => {
  subCategory
    .findOne({ _id: request.params.id })
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
