const mongoose = require('mongoose');

const AutoIncrement = require('mongoose-sequence')(mongoose);

const productsSchema = new mongoose.Schema({
  _id: Number,
  name: { type: String, required: true },
  description: { type: String, required: true },
  stockAmount: {type: Number ,default:2 },
  image: String,
  price: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  subCategory: {
    id: Number,
    title: String,
  },
});

productsSchema.plugin(AutoIncrement, { id: 'productsCounter' });

mongoose.model('products', productsSchema);
