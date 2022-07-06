const mongoose = require("mongoose");
require('../models/adminModel');
let Admin = mongoose.model('admin');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

module.exports.loginAdmin = (request, response, next) => {
    Admin.findOne(
        { email: request.body.email }, { password: 1 })
        .then(adminData => {
            if (!adminData) {
                let error = new Error("username or password incorrect")
                error.status = 401;
                throw error;
            }
            else {
                bcrypt.compare(request.body.password, adminData.password).then(function (result) {
                    if (result == true) {
                        let token = jwt.sign({
                            id: adminData._id,
                            role: "admin"
                        },
                            process.env.secret_Key, { expiresIn: "7d" })

                        response.status(200).json({ token, message: "login admin" });
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