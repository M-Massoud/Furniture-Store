const mongoose = require("mongoose");
require('../models/usersModel');
require('../models/adminModel');
let User = mongoose.model('users');
let Admin = mongoose.model('admin');
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(+process.env.saltRounds);

module.exports.forgotUserPassword = async (request, response, next) => {
    try {
        let userData = await User.findOne(
            { firstName: request.body.firstName, lastName: request.body.lastName, email: request.body.email, mobile: request.body.mobile },
            { password: 1 });
        if (userData == null) {
            next(new Error("User Data Is Incorrect"));
        }
        else {
            bcrypt.hash(request.body.newPassword, salt, async function (err, hash) {
                await User.updateOne({ _id: userData.id }, { $set: { password: hash } })
                response.status(200).json({ data: "user password updated successfully" });
            });

        }

    }

    catch (error) { next(error) }
}

module.exports.forgotAdminPassword = async (request, response, next) => {
    try {
        let adminData = await Admin.findOne(
            { firstName: request.body.firstName, lastName: request.body.lastName, email: request.body.email },
            { password: 1 });
        if (adminData == null) {
            next(new Error("Admin Data Is Incorrect"));
        }
        else {
            bcrypt.hash(request.body.newPassword, salt, async function (err, hash) {
                await Admin.updateOne({ _id: adminData.id }, { $set: { password: hash } })
                response.status(200).json({ data: "admin password updated successfully" });
            });

        }

    }

    catch (error) { next(error) }
}