const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
// const arrayUniquePlugin = require('mongoose-unique-array');
// const uniqueArrayObjectsPlugin = require('mongoose-unique-array-objects');

const addressSchema = new mongoose.Schema({
    _id:false,
    city:{
        type:String,
    },
    street:{
        type:String,
    }, 
    building:{
        type:Number,
    },
});

const paymentSchema = new mongoose.Schema({
    _id:{
        type:Number
    },
    cardType:{
        type:String,
        enum : ['visa','mastercard','meza'],
        default: 'visa',
    },
    cardNumber:{
        type:Number,
        unique:true
    }, 
});

paymentSchema.plugin(AutoIncrement, {id: 'payment-id'});

const ordersSchema = new mongoose.Schema({
    _id:false,
    productId:{
        type:Number,       
    },
    productName:{
        type:String,
    }, 
});

const schema = new mongoose.Schema({
    _id:{
        type:Number,
    },
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
    },
    address:{
        type:addressSchema,
        required:true
    },
    wishList:{
        type:[{type:Number}],
        ref:"products"
    },
    payment:{
        type:paymentSchema,
    },
    orders:{
        type:[{type:ordersSchema}],
    },
})

schema.plugin(AutoIncrement, {id: 'user-id'});
// schema.plugin(arrayUniquePlugin);
mongoose.model("users",schema);