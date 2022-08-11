const mongoose = require('mongoose');
require('../models/usersModel');
let User = mongoose.model('users');
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(+process.env.saltRounds);

module.exports.getAllUsers = async (request, response, next) => {
  try {
    const maxItemsNumberInPage = Number(request.query.itemCount) <= 20 ? Number(request.query.itemCount) : 10;

    const numberOfUsers = await User.count();
    const maxPagesNumber = Math.ceil(numberOfUsers / maxItemsNumberInPage);
    const requestedPageNumber = Number(request.query.page) <= maxPagesNumber ? Number(request.query.page) || 1 : maxPagesNumber;

    const users = await User.find().skip(((requestedPageNumber >= 1 ? requestedPageNumber : 1) - 1) * maxItemsNumberInPage).limit(maxItemsNumberInPage);

    response
      .status(200)
      .json({ resData: { maxPagesNumber: maxPagesNumber, users: users } });
  } catch (error) {
    next(error);
  }
};

module.exports.createUser = (request, response, next) => {
  bcrypt.hash(request.body.password, salt, function (err, hash) {
    let object = new User({
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      email: request.body.email,
      password: hash,
      mobile: request.body.mobile,
      address: request.body.address,
      wishList: request.body.wishList,
      payment: request.body.payment,
      orders: request.body.orders,
    });
    object
      .save()
      .then(() => {
        response.status(201).json({ data: 'user added successfully' });
      })
      .catch(error => next(error));
  });
};

module.exports.updateUser = async (request, response, next) => {
  try {
    let data = await User.findOne({ _id: request.body.id });

    for (let key in request.body) {
      if (key === 'email' || key === 'password') {
        console.log('not');
        next(new Error("cann't change email or password"));
      } else {
        // check if key is object type
        if (request.body[key].constructor.name == 'Object') {
          for (let item in request.body[key]) {
            data[key][item] = request.body[key][item];
          }
        }

        // check if key is array type
        else if (request.body[key].constructor.name == 'Array') {
          for (let item in request.body[key]) {
            // check uniqueness in array values
            if (!data[key].includes(request.body[key][item])) {
              data[key].push(request.body[key][item]);
            }
            else {
              console.log("item already exist");
            }
          }
        }
        else {
          data[key] = request.body[key];
        }
      }
    }

    await data.save();
    response.status(200).json({ data: 'user data updated successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports.getUserById = (request, response, next) => {
  User.find({ _id: request.params.id })
    .then(data => {
      if (data == null) {
        next(new Error('user not found'));
      } else response.status(200).json(data);
    })
    .catch(error => {
      next(error);
    });
};

module.exports.updateUserProfile = async (request, response, next) => {
  try {
    let data = await User.findOne({ _id: request.params.id });

    for (let key in request.body) {
      if (key === 'email' || key === 'password') {
        console.log('not');
        next(new Error("cann't change email or password"));
      } else {
        // check if key is object type
        if (request.body[key].constructor.name == 'Object') {
          for (let item in request.body[key]) {
            data[key][item] = request.body[key][item];
          }
        }

        // check if key is array type
        else if (request.body[key].constructor.name == 'Array') {
          for (let item in request.body[key]) {
            data[key].push(request.body[key][item]);
          }
        } else {
          data[key] = request.body[key];
        }
      }
    }

    await data.save();
    response.status(200).json({ data: 'user data updated successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteUserById = (request, response, next) => {
  User.deleteOne({ _id: request.params.id })
    .then(data => {
      if (data == null) {
        next(new Error('user not found'));
      } else response.status(200).json({ data: 'user deleted successfully' });
    })
    .catch(error => {
      next(error);
    });
};

module.exports.getUserWhishListByUserId = (request, response, next) => {
  User.find({ _id: request.params.id }, { wishList: 1 }).populate('wishList')
    .then(data => {
      if (data == null) {
        next(new Error('user wish list not found'));
      } else response.status(200).json(data);
    })
    .catch(error => {
      next(error);
    });
};

module.exports.addUserWhishListByUserId = async (request, response, next) => {
  try {
    let data = await User.updateOne({ _id: request.params.id }, { $push: { wishList: request.body.wishList } });
    console.log(data);
    response.status(200).json({ data: 'user data updated successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteUserWhishListByUserId = (request, response, next) => {
  User.updateOne(
    { _id: request.params.id },
    { $pull: { wishList: { $in: request.body.wishList } } }
  )
    .then(data => {
      if (data == null) {
        next(new Error('productId not found'));
      } else {
        response.status(200).json({ data: 'products removed successfully' });
      }
    })
    .catch(error => {
      next(error);
    });
};
