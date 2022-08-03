
const { body, param, query } = require("express-validator");
const check = require('express-validator').check;
module.exports.validationArry = [
    body("product").isArray({ type: Number }).withMessage("Products should be array of Products IDS"),
    body("totalPrice").isNumeric().withMessage("Product price should be Number..!"),
    body("quantity").isNumeric().withMessage("Product quantity should be Number..!"),
    body("status").optional().isIn(['fullfilled', 'pending', 'cancelled']).withMessage("order status should be one of ('fullfilled' && 'pending' && 'cancelled')")
];

module.exports.updateValidationArry = [
    body("product").isArray({ type: Number }).withMessage("Products should be array of Products IDS"),
    body("totalPrice").optional().isNumeric().withMessage("Product price should be Number..!"),
    body("quantity").optional().isNumeric().withMessage("Product quantity should be Number..!"),
    body("status").optional().isIn(['fullfilled', 'pending', 'cancelled']).withMessage("order status should be one of ('fullfilled' && 'pending' && 'cancelled')")
];

// body("product._id").isNumeric().withMessage("ProductId should be Number..!"),
// body("product.name").optional().isString().withMessage("ProductName should be String..!")