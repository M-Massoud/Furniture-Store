const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
require('../models/usersModel');
let User = mongoose.model('users');

module.exports.forgotUserPassword = async (request, response, next) => {
    try {
        let userData = await User.findOne(
            { firstName: request.body.firstName, lastName: request.body.lastName, email: request.body.email, mobile: request.body.mobile },
            { password: 1 });
        if (userData == null) {
            next(new Error("User Data Is Incorrect"));
        }
        else {
            bcrypt.hash(request.body.newPassword, 8, async function (err, hash) {
                await User.updateOne({ _id: userData.id }, { $set: { password: hash } })
                response.status(200).json({ data: "user password updated successfully" });
            });

        }

    }

    catch (error) { next(error) }
}