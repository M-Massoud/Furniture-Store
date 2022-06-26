
let Orders = require("./../models/orderModel");
const {orderUpdate } = require("../middlewares/orderUpdate");


module.exports.getAllorders = function (request, response,next) {
    Orders.find({})
        .then((data)=> {
            response.status(200).json(data);
        })
        .catch(error => {
          
            next(error);
        }); 
    
};// getAllorders function

module.exports.getOrderbyID = function (request, response,next) {
    Orders.findOne({ _id: request.params.id })
        .then(data => {
            if (data == null) { next(new Error("This Order is not found..!")); } else {
                response.status(200).json(data);
            }
        })
        .catch(error => next(error));
   
}
module.exports.addOrders = function (request, response,next) {
    let object = new Orders({
        _id:request.body._id,
        userId: request.body.userId,
        product: request.body.product,
        price: request.body.price,
        quantity: request.body.quantity,
        Status:request.body.Status
    });
    object.save()
        .then(data => {
            response.status(201).json({ data: "This Order is added succecfully..!" });
    }).catch(error=>next(error))
        
    
};

module.exports.updateOrders = orderUpdate;


module.exports.deleteOrders = function (request, response) {
    Orders.deleteOne({ _id: request.params.id }
        ).then(data => {
                response.status(200).json(data);
            })
        .catch(error => next(error))
   
};