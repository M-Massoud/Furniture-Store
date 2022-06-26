const express = require("express");

const validtor = require("../middlewares/orderExpressvaldMW");
const validationMW = require("../middlewares/validationMW");
const controller = require("./../controllers/ordersControlers");
const router = express.Router();

router.route("/orders")
    .get(controller.getAllorders)
    .post(validtor.validationArry,validationMW,controller.addOrders)
    .put(validtor.updateValidationArry,validationMW,controller.updateOrders)

router.route("/orders/:id")
    .get(controller.getOrderbyID)
    .delete(controller.deleteOrders)
    


module.exports = router;
