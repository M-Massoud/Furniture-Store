const express = require('express');
const { body } = require("express-validator");
const authMW = require("../middlewares/authMW");
const validationMW = require("../middlewares/validationMW");
const userAuthorizationMW = require("../middlewares/userAuthorizationMW");
const controller = require('../controllers/checkoutSessionController');

const router = express.Router();

router.post('/create-checkout-session', authMW, userAuthorizationMW, [
    body("shoppingCart").optional().isArray({ type: Object }).withMessage("wishList should be array of productId"),
],
    validationMW,
    controller.createCheckoutSession);

module.exports = router;