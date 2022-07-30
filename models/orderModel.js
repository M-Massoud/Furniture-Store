const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const orderSchema = new mongoose.Schema({
    _id:Number,
    userId:{type:Number,ref:"users"},
    product: { type:[{type: Number}],ref:"products"},
    created_at: { type: Date, default: Date.now },
    totalPrice: Number,
    quantity: Number,
    status:{ type: String, enum: ['fullfilled', 'pending', 'cancelled'],
    default:'pending' }
});//orders Schema

orderSchema.plugin(AutoIncrement, {id: 'orders_id_counter',inc_field: '_id' });

module.exports=mongoose.model("orders",orderSchema);


