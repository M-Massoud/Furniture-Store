const mongoose = require('mongoose');

const AutoIncrement = require('mongoose-sequence')(mongoose);
const uniqueValidator = require('mongoose-unique-validator');

const productsSchema = new mongoose.Schema({
  _id: Number,
  name: { type: String, required: true ,unique: true},
  description: { type: String, required: true },
  stockAmount: Number,
  image: String,
  price: { type: Number, required: true },
  discount: Number,
  subCategory: {
    id: Number,
    title: String,
  },
});

productsSchema.plugin(uniqueValidator).plugin(AutoIncrement, { id: 'productsCounter' });

mongoose.model('products', productsSchema);
