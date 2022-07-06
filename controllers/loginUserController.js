const mongoose = require("mongoose");
require('../models/usersModel');
let User = mongoose.model('users');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

module.exports.loginUser = (request, response, next) => {
    User.findOne(
        { email: request.body.email }, { password: 1 })
        .then(userData => {
            if (!userData) {
                let error = new Error("username or password incorrect")
                error.status = 401;
                throw error;
            }
            else {
                bcrypt.compare(request.body.password, userData.password).then(function (result) {
                    if (result == true) {
                        let token = jwt.sign({
                            id: userData._id,
                            role: "user"
                        },
                            process.env.secret_Key, { expiresIn: "7d" })

                        response.status(200).json({ token, message: "login user" });
                    }
                    else {
                        let error = new Error("invalid email or password");
                        next(error);
                    }
                }
                );
            }
        })
        .catch(error => next(error));
}