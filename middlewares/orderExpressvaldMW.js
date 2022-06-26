
const { body, param, query } = require("express-validator");
module.exports.validationArry = [
    // body("_id").isNumeric().withMessage("Order ID should be Number..!"),
    body("userId").isNumeric().withMessage("UserId should be Number..!"),
    body("product").isObject().withMessage("Product should be an object {} contains id & name ..!"),
    body("product._id").isNumeric().withMessage("ProductId should be Number..!"),
    body("product.name").isString().withMessage("ProductName should be String..!"),
    body("price").isNumeric().withMessage("Product price should be Number..!"),
    body("quantity").isNumeric().withMessage("Product quantity should be Number..!"),
    body("Status").isIn(['fullfilled', 'pending', 'cancelled']).withMessage("payment Status should be one of ('fullfilled' && 'pending' && 'cancelled')")
];

module.exports.updateValidationArry = [
    // body("_id").isNumeric().withMessage("Order ID should be Number..!"),
    body("userId").optional().isNumeric().withMessage("UserId should be Number..!"),
    body("product").optional().isObject().withMessage("Product should be an object {} contains id & name ..!"),
    body("product._id").optional().isNumeric().withMessage("ProductId should be Number..!"),
    body("product.name").optional().isString().withMessage("ProductName should be String..!"),
    body("price").optional().isNumeric().withMessage("Product price should be Number..!"),
    body("quantity").optional().isNumeric().withMessage("Product quantity should be Number..!"),
    body("Status").optional().isIn(['fullfilled', 'pending', 'cancelled']).withMessage("payment Status should be one of ('fullfilled' && 'pending' && 'cancelled')")
];