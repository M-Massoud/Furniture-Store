
let Orders = require("./../models/orderModel");
const { orderUpdate } = require("../middlewares/orderUpdate");
// const { body, params, query } = require("express-validator");


module.exports.getAllorders = async function (request, response,next) {
    try {
        const maxItemsNumberInPage = Number(request.query.itemCount) <= 20 ? Number(request.query.itemCount) : 10;
    
        const numberOfOrders = await Orders.count();
        const maxPagesNumber = Math.ceil(numberOfOrders / maxItemsNumberInPage);
        const requestedPageNumber = Number(request.query.page) <= maxPagesNumber ? Number(request.query.page) || 1 : maxPagesNumber;
    
        const orders = await Orders.find().populate({ path: "userId", select: "firstName lastName email mobile address" })
        .populate({ path: "products.product", select:"name price"}).skip(((requestedPageNumber >= 1 ? requestedPageNumber : 1) - 1) * maxItemsNumberInPage).limit(maxItemsNumberInPage);
    
        response
          .status(200)
          .json({ resData: { maxPagesNumber: maxPagesNumber, orders: orders } });
      } catch (error) {
        next(error);
      }

    }; // getAllorders function

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

module.exports.getOrdersByUserID = function (request, response,next) {
    Orders.find({ userId: request.body.userId }).populate({ path: "products.product", select:"name"})
        .then(data => {
           if ((request.role=="admin") ||((request.role == "user") && (request.id == request.body.userId))) {
                if (data == null) { next(new Error("This Order is not found..!")); } else {
                    response.status(200).json(data);
                }
            }
             else
                {
                 next(new Error("Not authorized!"));
                }
        })
        .catch(error => next(error));
}

module.exports.addOrders = function (request, response,next) {
    let object = new Orders({
        userId: request.body.userId,
        products: request.body.products,
        totalPrice: request.body.totalPrice,
        status:request.body.status
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
