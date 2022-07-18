const express = require("express");
const { body } = require("express-validator");
const controller = require("../controllers/changePasswordController")
const authMW = require("../Middlewares/authMW");
const userAuthorizationMW = require("../Middlewares/userAuthorizationMW");
const adminAuthorizationMW = require("../middlewares/adminAuthorizationMW");
const router = express.Router();

router.post("/changeUserPassword", authMW, userAuthorizationMW, [
    body("oldPassword").isStrongPassword().withMessage('user old Password shoud be at least 8 characters, with upper case,lower case, special character and numbers'),
    body("newPassword").isStrongPassword().withMessage('user new Password shoud be at least 8 characters, with upper case,lower case, special character and numbers'),
], controller.changeUserPassword);

router.post("/changeAdminPassword", authMW, adminAuthorizationMW, [
    body("oldPassword").isStrongPassword().withMessage('admin old Password shoud be at least 8 characters, with upper case,lower case, special character and numbers'),
    body("newPassword").isStrongPassword().withMessage('admin new Password shoud be at least 8 characters, with upper case,lower case, special character and numbers'),
], controller.changeAdminPassword);

module.exports = router;