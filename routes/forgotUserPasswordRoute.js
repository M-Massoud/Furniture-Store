const express = require("express");
const { body } = require("express-validator");
const validationMW = require("../Middlewares/validationMW");
const controller = require("../controllers/forgotUserPasswordController")
const router = express.Router();

router.post("/forgotUserPassword", [
    body("firstName").isAlpha().withMessage("user first name should be characters").isLength({ min: 1, max: 12, }).withMessage("firstName length should be between 1 and 12 numbers"),
    body("lastName").isAlpha().withMessage("user last name should be characters").isLength({ min: 1, max: 12, }).withMessage("lastName length should be between 1 and 12 numbers"),
    body("email").isEmail().withMessage("email should be with standared email form"),
    body("mobile").isMobilePhone().withMessage("mobile should be mobile numbers").isLength({ min: 10, max: 14, }).withMessage("mobile length should be between 10 and 14  numbers"),
    body("newPassword").isStrongPassword().withMessage("new password should be strong password").isLength({ min: 6 }).withMessage("new password length should be 6 at least  numbers"),
],
    validationMW, controller.forgotUserPassword);

module.exports = router;