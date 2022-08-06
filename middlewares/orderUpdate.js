
let Orders = require("./../models/orderModel");
module.exports.orderUpdate = async (request, response, next) => {
    try {
        const data = await Orders.findOne({ _id: request.body._id })
        for (let key in request.body) {
            if (typeof (request.body[key]).constructor.name == "Object") {
                for (let item in request.body[key]) {
                    data[key][item] = request.body[key][item];
                }
            }
            else if (request.body[key].constructor.name == 'Array') {
                for (let item in request.body[key]) {
                    data[key].push(request.body[key][item]);
                }
            } else {
                data[key] = request.body[key];
            }
        }
        await data.save()
        response.status(200).json({ data: "Order updated successfully" })
    }
    catch (error) { next(error) }

}