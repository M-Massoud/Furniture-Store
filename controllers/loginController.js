const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

require('../models/usersModel');
let User = mongoose.model('users');

require('../models/adminModel');
let Admin = mongoose.model('admin');

// let admin = {
//     email: "admin@db.com",
//     password:"123456"
// }

module.exports.login = (request, response, next) => {
  const userPromise = User.findOne(
    { email: request.body.email },
    { password: 1 }
  );
  const adminPromise = Admin.findOne(
    { email: request.body.email },
    { password: 1 }
  );

  const promises = [userPromise, adminPromise];

  Promise.allSettled(promises)
    .then(data => {
      // console.log(data);
      let userData = data[0].value;
      let adminData = data[1].value;

      if (userData != null) {
        console.log('user');
        bcrypt
          .compareSync(request.body.password, userData.password)
          .then(function (result) {
            if (result == true) {
              let token = jwt.sign(
                {
                  id: userData._id,
                  role: 'user',
                },
                process.env.secret_Key,
                { expiresIn: '7d' }
              );

              response.status(200).json({ token, message: 'login user' });
            } else {
              let error = new Error('invalid email or password');
              next(error);
            }
          });
      } else if (adminData != null) {
        console.log('admin');
        bcrypt
          .compare(request.body.password, adminData.password)
          .then(function (result) {
            if (result == true) {
              let token = jwt.sign(
                {
                  id: adminData._id,
                  role: 'admin',
                },
                process.env.secret_Key,
                { expiresIn: '7d' }
              );

              response.status(200).json({ token, message: 'login admin' });
            } else {
              let error = new Error('invalid email or password');
              next(error);
            }
          });
      } else {
        let error = new Error('username or password incorrect');
        error.status = 401;
        throw error;
      }
    })
    .catch(error => next(error));
};
