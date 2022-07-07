const mongoose = require('mongoose');
require('../models/adminModel');
const { body } = require('express-validator');
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(+process.env.saltRounds);
// console.log(typeof process.env.saltRounds);

let Admin = mongoose.model('admin');

module.exports.getAllAdmins = (request, response) => {
  // console.log(request.query);
  // console.log(request.params);
  Admin.find({})
    .then(data => {
      response.status(200).json(data);
    })
    .catch(error => {
      next(error);
    });
};

module.exports.getAdminById = (request, response, next) => {
  Admin.findOne({ _id: request.params.id })
    .then(data => {
      if (data == null) next(new Error(' Admin not found'));
      response.status(200).json(data);
    })
    .catch(error => {
      next(error);
    });
};

module.exports.createAdmin = (request, response, next) => {
  bcrypt.hash(request.body.password, salt, function (err, hash) {
    let object = new Admin({
      _id: request.body.id,
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      password: hash,
      email: request.body.email,
    });
    object
      .save()
      .then(data => {
        response.status(201).json({ data: 'added' });
      })
      .catch(error => next(error));
  });
};

module.exports.updateAdmin = async (request, response, next) => {
  try {
    const data = await Admin.findOne({ _id: request.body.id });

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

module.exports.deleteAdmin = (request, response) => {
  Admin.deleteOne({ _id: request.params.id }, {})
    .then(data => {
      response.status(200).json(data);
    })
    .catch(error => next(error));
};
