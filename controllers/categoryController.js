const mongoose = require('mongoose');
require('../models/categoryModel');
let Category = mongoose.model('categories');


module.exports.getAllCategories = (request, response) => {
  // console.log(request.query);
  // console.log(request.params);
  Category.find({})
    .then(data => {
      response.status(200).json(data);
    })
    .catch(error => {
      next(error);
    });
};

module.exports.getCategoryById = (request, response, next) => {
  Category.findOne({ _id: request.params.id })
    .then(data => {
      if (data == null) next(new Error(' Category not found'));
      response.status(200).json(data);
    })
    .catch(error => {
      next(error);
    });
};

module.exports.createCategory = (request, response, next) => {
  let object = new Category({
    title: request.body.title,
    subCategory: request.body.subCategory,
  });
  object
    .save()
    .then(data => {
      response.status(201).json({ data: 'Category Added Successfully' });
    })
    .catch(error => next(error));
};

module.exports.updateCategory = async (request, response, next) => {
  try {
    const data = await Category.findOne({ _id: request.body.id });

    for (let key in request.body) {
      console.log(key);
      if (request.body[key].constructor.name == 'Array') {
        for (let item in request.body[key]) {
          data[key].push(request.body[key][item]);
        }
      }
      else
        data[key] = request.body[key];
    }

    await data.save();

    response.status(200).json({ data: 'Category Updated Successfully' });
  } catch (error) {
    next(error);
  }
};

// module.exports.deleteCategory = (request, response, next) => {
//   Category.deleteOne({ _id: request.params.id }, {})
//     .then(data => {
//       response.status(200).json({ data: 'Category Deleted Successfully' });
//     })
//     .catch(error => next(error));
// };

module.exports.deleteCategory = (request, response, next) => {
  Category.deleteOne({ _id: request.params.id })
    .then(data => {
      if (data == null) {
        next(new Error('Category not found'));
      } else response.status(200).json({ data: 'Category Deleted Successfully' });
    })
    .catch(error => {
      next(error);
    });
};

module.exports.deleteCategorySubCategoryById = (request, response, next) => {
  Category.updateOne(
    { _id: request.params.id },
    { $pull: { subCategory: { $in: request.body.subCategory } } }
  )
    .then(data => {
      if (data == null) {
        next(new Error('subCategory not found'));
      } else {
        response.status(200).json({ data: 'subCategory removed successfully' });
      }
    })
    .catch(error => {
      next(error);
    });
};