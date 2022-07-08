
const { body, param, query } = require("express-validator");
const check = require('express-validator').check;
module.exports.validationArry = [
    // body("_id").isNumeric().withMessage("Order ID should be Number..!"),
    body("userId").isNumeric().withMessage("UserId should be Number..!"),
    body("product").isArray({ type: Object }).withMessage("Products should be array of objects"),
    check('product.*.id').optional().isNumeric().withMessage("Product id should be number"),
    check('product.*.price').optional().isNumeric().withMessage("Product price should be number"),
    check('product.*.name').optional().isString().withMessage("product name should be string"),
    body("totalPrice").isNumeric().withMessage("Product price should be Number..!"),
    body("quantity").isNumeric().withMessage("Product quantity should be Number..!"),
    body("Status").isIn(['fullfilled', 'pending', 'cancelled']).withMessage("payment Status should be one of ('fullfilled' && 'pending' && 'cancelled')")
];

module.exports.updateValidationArry = [
    // body("_id").isNumeric().withMessage("Order ID should be Number..!"),
    body("userId").optional().isNumeric().withMessage("UserId should be Number..!"),
    body("product").optional().isArray({ type: Object }).withMessage("Products should be array of objects"),
    check('product.*.id').optional().isNumeric().withMessage("Product id should be number"),
    check('product.*.price').optional().isNumeric().withMessage("Product price should be number"),
    check('product.*.name').optional().isString().withMessage("product name should be string"),
    body("totalPrice").optional().isNumeric().withMessage("Product price should be Number..!"),
    body("quantity").optional().isNumeric().withMessage("Product quantity should be Number..!"),
    body("Status").optional().isIn(['fullfilled', 'pending', 'cancelled']).withMessage("payment Status should be one of ('fullfilled' && 'pending' && 'cancelled')")
];

// body("product._id").isNumeric().withMessage("ProductId should be Number..!"),
// body("product.name").optional().isString().withMessage("ProductName should be String..!")