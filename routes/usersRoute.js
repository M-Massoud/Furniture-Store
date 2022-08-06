const express = require("express");
const { body, param } = require("express-validator");
const check = require('express-validator').check;
const controller = require("../controllers/userController");
const validationMW = require("../middlewares/validationMW");
const authMW = require("../middlewares/authMW");
const adminAuthorizationMW = require("../middlewares/adminAuthorizationMW");
const adminOrUserByIdAuthorizationMW = require("../middlewares/adminOrUserByIdAuthorizationMW");


const router = express.Router();

router.route("/users")
    .get(authMW, adminAuthorizationMW, controller.getAllUsers)
    // adminAuthorizationMW not added here as we want registeration for new users
    .post([
        body("firstName").isAlpha().withMessage("user first name should be characters").isLength({ min: 1, max: 12, }).withMessage("firstName length should be between 1 and 12 numbers"),
        body("lastName").isAlpha().withMessage("user last name should be characters").isLength({ min: 1, max: 12, }).withMessage("lastName length should be between 1 and 12 numbers"),
        body("email").isEmail().withMessage("email should be with standared email form"),
        body("password").isStrongPassword().withMessage('user Password shoud be at least 8 characters, with upper case,lower case, special character and numbers'),
        body("mobile").isMobilePhone().withMessage("mobile should be mobile numbers").isLength({ min: 10, max: 14, }).withMessage("mobile length should be between 10 and 14  numbers"),

        body("address").isObject().withMessage("address should be object"),
        check('address.city').isString().withMessage("city name should be string"),
        check('address.street').isString().withMessage("street name should be string"),
        check('address.building').isNumeric().withMessage("building number should be number"),

        body("wishList").optional().isArray({ type: Number }).withMessage("wishList should be array of productId"),

        body("payment").optional().isObject().withMessage("payment should be object"),
        check('payment.cardType').isIn(['visa', 'mastercard', 'meza']).withMessage("card type should be one of these ['visa','mastercard','meza']"),
        check('payment.cardNumber').isNumeric().withMessage("card number should be number").isLength({ min: 16, max: 16 }).withMessage("card number length should be 16 numbers"),
    ],
        validationMW,
        controller.createUser)
    .put(authMW, adminAuthorizationMW, [
        body("id").isNumeric().withMessage("user id should be number"),
        body("firstName").optional().isAlpha().withMessage("user first name should be characters").isLength({ min: 1, max: 12, }).withMessage("firstName length should be between 1 and 12 numbers"),
        body("lastName").optional().isAlpha().withMessage("user last name should be characters").isLength({ min: 1, max: 12, }).withMessage("lastName length should be between 1 and 12 numbers"),
        body("mobile").optional().isMobilePhone().withMessage("mobile should be mobile numbers").isLength({ min: 10, max: 14, }).withMessage("mobile length should be between 10 and 14  numbers"),

        body("address").optional().isObject().withMessage("address should be object"),
        check('address.city').optional().isString().withMessage("city name should be string"),
        check('address.street').optional().isString().withMessage("street name should be string"),
        check('address.building').optional().isNumeric().withMessage("building number should be number"),

        body("wishList").optional().isArray({ type: Number }).withMessage("wishList should be array of productId"),

        body("payment").optional().isObject({}).withMessage("payment should be object"),
        check('payment.cardType').optional().isIn(['visa', 'mastercard', 'meza']).withMessage("card type should be one of these ['visa','mastercard','meza']"),
        check('payment.cardNumber').optional().isNumeric().withMessage("card number should be number").isLength({ min: 16, max: 16 }).withMessage("card number length should be 16 numbers"),

        body("orders").optional().isArray({ type: Object }).withMessage("orders should be array of objects"),
        check('orders.*.productId').optional().isNumeric().withMessage("orders productId should be number"),
        check('orders.*.productName').optional().isString().withMessage("orders productName should be string"),
    ],
        validationMW,
        controller.updateUser)
// .delete(adminAuthorizationMW, [
//     body("id").isNumeric().withMessage("user id should be number"),
// ],
//     validationMW,
//     controller.deleteUser)

router.route("/user/:id")
    .get(authMW, adminOrUserByIdAuthorizationMW, [
        param("id").isNumeric().withMessage("user id should be number"),
    ],
        validationMW,
        controller.getUserById)
    .put(authMW, adminOrUserByIdAuthorizationMW, [
        param("id").isNumeric().withMessage("user id should be number"),
        body("firstName").optional().isAlpha().withMessage("user first name should be characters").isLength({ min: 1, max: 12, }).withMessage("firstName length should be between 1 and 12 numbers"),
        body("lastName").optional().isAlpha().withMessage("user last name should be characters").isLength({ min: 1, max: 12, }).withMessage("lastName length should be between 1 and 12 numbers"),
        body("mobile").optional().isMobilePhone().withMessage("mobile should be mobile numbers").isLength({ min: 10, max: 14, }).withMessage("mobile length should be between 10 and 14  numbers"),

        body("address").optional().isObject().withMessage("address should be object"),
        check('address.city').optional().isString().withMessage("city name should be string"),
        check('address.street').optional().isString().withMessage("street name should be string"),
        check('address.building').optional().isNumeric().withMessage("building number should be number"),

        body("wishList").optional().isArray({ type: Number }).withMessage("wishList should be array of productId"),

        body("payment").optional().isObject({}).withMessage("payment should be object"),
        check('payment.cardType').optional().isIn(['visa', 'mastercard', 'meza']).withMessage("card type should be one of these ['visa','mastercard','meza']"),
        check('payment.cardNumber').optional().isNumeric().withMessage("card number should be number").isLength({ min: 16, max: 16 }).withMessage("card number length should be 16 numbers"),

        body("orders").optional().isArray({ type: Object }).withMessage("orders should be array of objects"),
        check('orders.*.productId').optional().isNumeric().withMessage("orders productId should be number"),
        check('orders.*.productName').optional().isString().withMessage("orders productName should be string"),
    ],
        validationMW,
        controller.updateUserProfile)
    .delete(authMW, adminOrUserByIdAuthorizationMW, [
        param("id").isNumeric().withMessage("user id should be number"),
    ],
        validationMW,
        controller.deleteUserById)

router.route("/user/:id/wishlist")
    .get(authMW, adminOrUserByIdAuthorizationMW, [
        param("id").isNumeric().withMessage("user id should be number"),
    ],
        validationMW,
        controller.getUserWhishListByUserId)
    .put(authMW, adminOrUserByIdAuthorizationMW, [
        param("id").isNumeric().withMessage("id should be numbers"),
        body("wishList").optional().isArray({ type: Number }).withMessage("wishList should be array of productId"),
    ],
        validationMW,
        controller.addUserWhishListByUserId)
    .delete(authMW, adminOrUserByIdAuthorizationMW, [
        param("id").isNumeric().withMessage("id should be numbers"),
        body("wishList").optional().isArray({ type: Number }).withMessage("wishList should be array of productId"),
    ],
        validationMW,
        controller.deleteUserWhishListByUserId)


module.exports = router;
