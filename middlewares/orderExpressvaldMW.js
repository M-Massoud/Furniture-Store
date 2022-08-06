
const { body, param, query } = require("express-validator");
const check = require('express-validator').check;
module.exports.validationArry = [
    body("products").optional().isArray({ type: Object }).withMessage("Order Products should be an array of object"),
    check('products.*.product').optional().isNumeric().withMessage("Order Product should be a product id number"),
    check('products.*.quantity').optional().isNumeric().withMessage("Order Quantity should be a number"),
    body("totalPrice").isNumeric().withMessage("Product price should be Number..!"),
    body("status").optional().isIn(['fullfilled', 'pending', 'cancelled']).withMessage("order status should be one of ('fullfilled' && 'pending' && 'cancelled')")
];

module.exports.updateValidationArry = [
    body("products").optional().isArray({ type: Object }).withMessage("Order Products should be an array of object"),
    check('products.*.product').optional().isNumeric().withMessage("Order Product should be a product id number"),
    check('products.*.quantity').optional().isNumeric().withMessage("Order Quantity should be a number"),
    body("totalPrice").optional().isNumeric().withMessage("Product price should be Number..!"),
    body("status").optional().isIn(['fullfilled', 'pending', 'cancelled']).withMessage("order status should be one of ('fullfilled' && 'pending' && 'cancelled')")
];

// body("product._id").isNumeric().withMessage("ProductId should be Number..!"),
// body("product.name").optional().isString().withMessage("ProductName should be String..!")