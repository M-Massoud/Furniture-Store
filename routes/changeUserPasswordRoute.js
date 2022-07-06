const express = require("express");
const { body } = require("express-validator");
const controller = require("../controllers/changeUserPasswordController")
const authMW = require("./../Middlewares/authMW");
const userAuthorizationMW = require("./../Middlewares/userAuthorizationMW");
const router = express.Router();

router.post("/changeUserPassword", authMW, userAuthorizationMW, [
    body("oldPassword").isStrongPassword().withMessage("old password should be strong password").isLength({ min: 6 }).withMessage("old password length should be 6 at least  numbers"),
    body("newPassword").isStrongPassword().withMessage("new password should be strong password").isLength({ min: 6 }).withMessage("new password length should be 6 at least  numbers"),
], controller.changeUserPassword);

module.exports = router;