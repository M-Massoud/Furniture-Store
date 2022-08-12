const mongoose = require('mongoose');
require('../models/subCategoryModel');
const { body } = require('express-validator');

let subCategory = mongoose.model('subCategory');

module.exports.getAllSubCategories = async (request, response) => {
  try {
    const maxItemsNumberInPage = Number(request.query.itemCount);

    const numberOfSubCategories = await subCategory.count();
    const maxPagesNumber = Math.ceil(numberOfSubCategories / maxItemsNumberInPage || 1);
    const requestedPageNumber = Number(request.query.page) <= maxPagesNumber ? Number(request.query.page) || 1 : maxPagesNumber;

    const subCategories = await subCategory.find().populate({ path: 'products', select: 'name price' }).skip(((requestedPageNumber >= 1 ? requestedPageNumber : 1) - 1) * maxItemsNumberInPage).limit(maxItemsNumberInPage);

    response
      .status(200)
      .json({ resData: { maxPagesNumber: maxPagesNumber, subCategories: subCategories } });
  } catch (error) {
    next(error);
  }

};

module.exports.getSubCategoryById = (request, response, next) => {
  subCategory
    .findOne({ _id: request.params.id })
    .populate('products')
    .then(data => {
      if (data == null) next(new Error('subCategory not found'));
      response.status(200).json(data);
    })
    .catch(error => {
      next(error);
    });
};

module.exports.createSubCategory = (request, response, next) => {
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

module.exports.updateSubCategory = async (request, response, next) => {
  // console.log(request.body.id);
  try {
    const data = await subCategory.findOne({ _id: request.body.id });

    for (let key in request.body) {
      console.log(key);
      if (request.body[key].constructor.name == 'Array') {
        for (let item in request.body[key]) {
          // check uniqueness in array values
          if (!data[key].includes(request.body[key][item])) {
            data[key].push(request.body[key][item]);
          }
          else {
            console.log("item already exist");
          }
        }
      } else data[key] = request.body[key];
    }

    await data.save();

    response.status(200).json({ data: 'sub Category Updated Successfully' });
  } catch (error) {
    next(error);
  }
};


module.exports.deleteProductFromSubcategoryById = (request, response, next) => {
  subCategory.updateOne(
    { _id: request.params.id },
    { $pull: { products: { $in: request.body.products } } }
  )
    .then(data => {
      if (data == null || data.modifiedCount === 0) {
        next(new Error('nedded product cannot be found'));
      } else {
        // console.log(data);
        response.status(200).json({ data: 'product removed successfully from subcategory' });
      }
    })
    .catch(error => {
      next(error);
    });
};

module.exports.deleteSubCategory = (request, response, next) => {
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

module.exports.updateSubCategoryProducts = async (request, response, next) => {
  try {
    await subCategory.updateOne({ _id: request.body.id }, { $push: { products: request.body.products } });
    response.status(200).json({ data: 'subCategory products updated successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports.editSubCategory = async (request, response, next) => {

  try {
    const data = await subCategory.findOne({ _id: request.body.id });

    for (let key in request.body) {
      data[key] = request.body[key];
    }

    await data.save();

    response.status(200).json({ data: 'sub Category Updated Successfully' });
  } catch (error) {
    next(error);
  }
};