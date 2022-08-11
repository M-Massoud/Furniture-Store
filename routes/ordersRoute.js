const express = require("express");
const { body, param } = require("express-validator");
const authMW = require('./../middlewares/authMW');
const validtor = require("../middlewares/orderExpressvaldMW");
const validationMW = require("../middlewares/validationMW");
const controller = require("./../controllers/ordersControlers");
const { userAuthoize, adminAuthoize } = require("./../middlewares/orderauthorizationMW");
const adminOrUserByIdAuthorizationMW = require("../middlewares/adminOrUserByIdAuthorizationMW");
const userAuthorizationMW = require("../middlewares/userAuthorizationMW");
const router = express.Router();

router.route("/orders")
    .get(authMW, adminAuthoize, controller.getAllorders)
    .post(authMW, userAuthorizationMW, validtor.validationArry, validationMW, controller.addOrders)
    .put(authMW, adminAuthoize, validtor.updateValidationArry, validationMW, controller.updateOrders)

router.route("/orders/:id")
    .get(authMW, adminOrUserByIdAuthorizationMW, controller.getOrderbyID)
    .delete(authMW, adminAuthoize, controller.deleteOrders)

router.route("/ordersByUserID")
    .post(authMW, userAuthoize, [
        body("userId").isNumeric().withMessage("user id should be number"),
    ],
        validationMW,
        controller.getOrdersByUserID)

module.exports = router;

