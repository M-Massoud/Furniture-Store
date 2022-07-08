
let Orders = require("./../models/orderModel");
const { orderUpdate } = require("../middlewares/orderUpdate");
// const { body, params, query } = require("express-validator");


module.exports.getAllorders = function (request, response,next) {
    Orders.find({}).populate({ path: "userId", select: "firstName lastName email mobile address" })
        .populate({ path: "product", select:"name price"})
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
           if ((request.role=="admin") ||((request.role == "user") && (request.id == data.userId))) {
                if (data == null) { next(new Error("This Order is not found..!")); } else {
                    response.status(200).json(data);
                    console.log(request.id)
                }
            } else { next(new Error("Not authorized!")) }
            
            // console.log(params.id)
        })
        .catch(error => next(error));
   
}
module.exports.addOrders = function (request, response,next) {
    let object = new Orders({
        _id:request.body._id,
        userId: request.body.userId,
        product: request.body.product,
        totalPrice: request.body.totalPrice,
        quantity: request.body.quantity,
        Status:request.body.Status
    });
    object.save()
        .then(data => {
            
            response.status(201).json({ data: "This Order is added succecfully..!" });
    }).catch(error=>next(error))
        
    
};

module.exports.updateOrders = orderUpdate;


module.exports.deleteOrders = function (request, response,next) {
    Orders.findOne({ _id: request.params.id })
    .then(data => {
       if ((request.role=="admin") ||((request.role == "user") && (request.id == data.userId))) {
            if (data == null) { next(new Error("This Order is not found..!")); } else {
                Orders.deleteOne({ _id: request.params.id }
                    ).then(data => {
                            response.status(200).json(data);
                        })
                    .catch(error => next(error))
            }
        } else { next(new Error("Not authorized!")) }
        
        // console.log(params.id)
    }).catch(error => next(error));   
};



// module.exports.deleteOrders = function (request, response) {
    
//     Orders.deleteOne({ _id: request.params.id }
//         ).then(data => {
//                 response.status(200).json(data);
//             })
//         .catch(error => next(error))
   
// };