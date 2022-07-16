const mongoose = require('mongoose');

const AutoIncrement = require('mongoose-sequence')(mongoose);

const arrayUniquePlugin = require('mongoose-unique-array');

// A- craete schema object
const schema = new mongoose.Schema({
  _id: { type: Number },
  title: {
    type: String,
    required: true,
    unique: true,
  },
  subCategory: {
    type: [{ type: Number }],
    ref: "subCategory"
  },
});
schema.plugin(AutoIncrement, { id: 'category_id_counter' });
schema.plugin(arrayUniquePlugin);

//B- mapping

//setter
mongoose.model('categories', schema);
