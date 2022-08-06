const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const OrderProductsDetails = new mongoose.Schema({
    _id: false,
    product: {
        type: Number,
        ref: "products",
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
});

const orderSchema = new mongoose.Schema({
    _id: Number,
    userId: { type: Number, ref: "users" },
    products: [OrderProductsDetails],
    created_at: { type: Date, default: Date.now },
    totalPrice: Number,
    status: {
        type: String,
        enum: ['fullfilled', 'pending', 'cancelled'],
        default: 'pending'
    }
});//orders Schema

orderSchema.plugin(AutoIncrement, { id: 'orders_id_counter' });

module.exports = mongoose.model("orders", orderSchema);


