const mongoose = require("mongoose");
require("../models/subCategoryModel");
const { body } = require("express-validator");

let SupCategory = mongoose.model("subCategory");

module.exports.getAllSupCategorys = (request, response) => {
  console.log(request.query);
  console.log(request.params);
  SupCategory.find({})
    .then((data) => {
      response.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.getSupCategoryById = (request, response, next) => {
    SupCategory.findOne({ _id: request.params.id })
    .then((data) => {
      if (data == null) next(new Error(" supCategory not found"));
      response.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.createSupCategory = (request, response, next) => {
  let object = new SupCategory({
    
    title: request.body.title,
  });
  object
    .save()
    .then((data) => {
      response.status(201).json({ data: "added" });
    })
    .catch((error) => next(error));
};

module.exports.updateSupCategory = async (request, response, next) => {
  try {
    const data = await SupCategory.findOne({ _id: request.body.id });

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

module.exports.deleteSupCategory = (request, response, next) => {
    SupCategory.deleteOne({ _id: request.params.id }, {})
    .then((data) => {
      response.status(200).json(data);
    })
    .catch((error) => next(error));
};
