
let Orders= require("./../models/orderModel");
module.exports.orderUpdate =async (request,response,next)=>{ 
    try{
    const data = await Orders.findOne({ _id: request.body._id })
    for (let key in request.body) {
        if(typeof(request.body[key])=="object"){
            for(let item in request.body[key]){
                data[key][item] = request.body[key][item];
            }
        }
        else
        data[key] = request.body[key];
       }
       await data.save()
       response.status(200).json({data : "Order updated successfully" })
    }
    catch(error) {next(error)}

}