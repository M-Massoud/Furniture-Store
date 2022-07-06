const mongoose = require("mongoose");
require('../models/usersModel');
let User = mongoose.model('users');
const bcrypt = require('bcrypt');

module.exports.changeUserPassword = async (request, response, next) => {

    try {
        let userData = await User.findOne({ _id: request.id }, { _id: 0, password: 1 });
        if (userData == null) {
            next(new Error("User Old Password Is Incorrect"));
        }
        else {
            if (request.body.oldPassword != request.body.newPassword) {
                bcrypt.compare(request.body.oldPassword, userData.password).then(function (result) {
                    if (result == true) {
                        bcrypt.hash(request.body.newPassword, 8, async function (err, hash) {
                            await User.updateOne({ _id: request.id }, { $set: { password: hash } })
                            response.status(200).json({ data: "user password updated successfully" });
                        });
                    }
                    else {
                        let error = new Error("oldPassword is wrong");
                        next(error);
                    }
                });
            }
            else {
                let error = new Error("oldPassword and newPassword shouldn't be the same");
                next(error);
            }

        }

    }

    catch (error) { next(error) }

}