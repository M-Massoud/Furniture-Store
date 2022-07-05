const mongoose = require('mongoose');
require('../models/subCategoryModel');
const { body } = require('express-validator');

let subCategory = mongoose.model('subCategory');

module.exports.getAllsubCategories = (request, response) => {
  console.log(request.query);
  console.log(request.params);
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
      if (data == null) next(new Error(' subCategory not found'));
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
      response.status(201).json({ data: 'added' });
    })
    .catch(error => next(error));
};

module.exports.updatesubCategory = async (request, response, next) => {
  try {
    const data = await subCategory.findOne({ _id: request.body.id });

    for (const key in request.body) {
      if (typeof request.body[key] == 'object') {
        for (let item in request.body[key]) {
          data[key][item] = request.body[key][item];
        }
      } else data[key] = request.body[key];
    }

    await data.save();

    response.status(200).json({ data: 'updated' });
  } catch (error) {
    next(error);
  }
};

module.exports.deletesubCategory = (request, response, next) => {
  subCategory
    .deleteOne({ _id: request.params.id }, {})
    .then(data => {
      response.status(200).json(data);
    })
    .catch(error => next(error));
};
