const express = require("express");
const authMW = require('./../middlewares/authMW');
const validtor = require("../middlewares/orderExpressvaldMW");
const validationMW = require("../middlewares/validationMW");
const controller = require("./../controllers/ordersControlers");
const { userAuthoize, adminAuthoize } = require("./../middlewares/orderauthorizationMW"); 
const router = express.Router();

router.route("/orders")
    .get(authMW, adminAuthoize,authMW,controller.getAllorders)
    .post(authMW,validtor.validationArry,validationMW,controller.addOrders)
    .put(authMW,validtor.updateValidationArry,validationMW,controller.updateOrders)

router.route("/orders/:id")
.all(authMW, userAuthoize)
    .get(controller.getOrderbyID)
    .delete(controller.deleteOrders)
    


module.exports = router;

// if you want to use pagination uncomment this

// router
//   .route('/orders/page/:pageNumber')
//   .get(controller.getAllOrdersByPageNumber);

// module.exports = router;
