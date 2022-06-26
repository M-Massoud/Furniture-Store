const mongoose = require("mongoose");
require("../models/categoryModel");
const { body } = require("express-validator");

let Category = mongoose.model("categorys");

module.exports.getAllCategorys = (request, response) => {
  console.log(request.query);
  console.log(request.params);
  Category.find({})
    .then((data) => {
      response.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.getCategoryById = (request, response, next) => {
    Category.findOne({ _id: request.params.id })
    .then((data) => {
      if (data == null) next(new Error(" Category not found"));
      response.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.createCategory = (request, response, next) => {
  let object = new Category({
    
    title: request.body.title,
  });
  object
    .save()
    .then((data) => {
      response.status(201).json({ data: "added" });
    })
    .catch((error) => next(error));
};

module.exports.updateCategory = async (request, response, next) => {
  try {
    const data = await Category.findOne({ _id: request.body.id });

    for (const key in request.body) {
      if (typeof request.body[key] == "object") {
        for (let item in request.body[key]) {
          data[key][item] = request.body[key][item];
        }
      } else data[key] = request.body[key];
    }

    await data.save();

    response.status(200).json({ data: "updated" });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteCategory = (request, response, next) => {
    Category.deleteOne({ _id: request.params.id }, {})
    .then((data) => {
      response.status(200).json(data);
    })
    .catch((error) => next(error));
};
