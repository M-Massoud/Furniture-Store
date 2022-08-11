const mongoose = require("mongoose");
require('../models/usersModel');
require('../models/adminModel');
let User = mongoose.model('users');
let Admin = mongoose.model('admin');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

const generateToken = (data,secret_Key) => jwt.sign(data, secret_Key, { expiresIn: "7d" });
const validateToken = (token,secret_Key) => {
    try {
        const decoded = jwt.verify(token, secret_Key);
        return decoded;
    } catch (err) {
        return {};
    }
};// validated token
module.exports.generateToken = generateToken;
module.exports.validateToken = validateToken;

module.exports.loginUser = (request, response, next) => {

    User.findOne(
        { email: request.body.email }, { password: 1 })
        .then(userData => {
            if (!userData) {
                let error = new Error("Email or Password Is Incorrect")
                error.status = 401;
                throw error;
            }
            else {
                bcrypt.compare(request.body.password, userData.password).then(function (result) {
                    if (result == true) {
                        let token = generateToken({
                            id: userData._id,
                            role: "user"
                        },
                            process.env.secret_Key)

                        response.status(200).json({ token, message: "login user" });
                    }
                    else {
                        let error = new Error("Invalid Email Or Password");
                        next(error);
                    }
                }
                );
            }
        })
        .catch(error => next(error));
}

module.exports.loginAdmin = (request, response, next) => {
    Admin.findOne(
        { email: request.body.email }, { password: 1 })
        .then(adminData => {
            if (!adminData) {
                let error = new Error("Email or Password Is Incorrect")
                error.status = 401;
                throw error;
            }
            else {
                bcrypt.compare(request.body.password, adminData.password).then(function (result) {
                    if (result == true) {
                        let token = generateToken({
                            id: adminData._id,
                            role: "admin"
                        },
                            process.env.secret_Key) 
                        response.status(200).json({ token, message: "login admin" });
                    }
                    else {
                        let error = new Error("Invalid Email Or Password");
                        next(error);
                    }
                }
                );
            }
        })
        .catch(error => next(error));
}