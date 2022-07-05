const mongoose = require('mongoose');

const AutoIncrement = require('mongoose-sequence')(mongoose);

// A- craete schema object
const schema = new mongoose.Schema(
  {
    _id: { type: Number },
    title: {
      type: String,
      required: true,
    },
    subCategory: [
      {
        type: mongoose.Schema.Types.Number,
        ref: 'subCategory',
      },
    ],
  },
  { id: false }
);
schema.plugin(AutoIncrement, { id: 'category_id_counter', inc_field: '_id' });

//B- mapping

//setter
mongoose.model('categories', schema);
