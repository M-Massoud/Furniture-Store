const express = require("express");
const { body } = require("express-validator");
const validationMW = require("../Middlewares/validationMW");
const controller = require("../controllers/forgotPasswordController")
const router = express.Router();

router.post("/forgotUserPassword", [
    body("firstName").isAlpha().withMessage("user first name should be characters").isLength({ min: 1, max: 12, }).withMessage("firstName length should be between 1 and 12 numbers"),
    body("lastName").isAlpha().withMessage("user last name should be characters").isLength({ min: 1, max: 12, }).withMessage("lastName length should be between 1 and 12 numbers"),
    body("email").isEmail().withMessage("email should be with standared email form"),
    body("mobile").isMobilePhone().withMessage("mobile should be mobile numbers").isLength({ min: 10, max: 14, }).withMessage("mobile length should be between 10 and 14  numbers"),
    body("newPassword").isStrongPassword().withMessage('user new Password shoud be at least 8 characters, with upper case,lower case, special character and numbers'),
],
    validationMW, controller.forgotUserPassword);

router.post("/forgotAdminPassword", [
    body("firstName").isAlpha().withMessage("admin first name should be characters").isLength({ min: 1, max: 12, }).withMessage("firstName length should be between 1 and 12 numbers"),
    body("lastName").isAlpha().withMessage("admin last name should be characters").isLength({ min: 1, max: 12, }).withMessage("lastName length should be between 1 and 12 numbers"),
    body("email").isEmail().withMessage("email should be with standared email form"),
    body("newPassword").isStrongPassword().withMessage('admin new Password shoud be at least 8 characters, with upper case,lower case, special character and numbers'),
],
    validationMW, controller.forgotAdminPassword);

module.exports = router;