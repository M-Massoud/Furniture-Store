const mongoose = require("mongoose");

const AutoIncrement = require("mongoose-sequence")(mongoose);

// A- craete schema object
const schema = new mongoose.Schema(
  {
    _id: { type: Number,},
    title: {
      type: String,
      required: true,
      unique: true,
    },
    products: [
      {
        type: mongoose.Schema.Types.Number,
        ref: "products"
      },
    ],
  },
  { id: false }
);
schema.plugin(AutoIncrement, {id: 'subCategory_id_counter',inc_field: '_id'});

//B- mapping

//setter
mongoose.model("subCategory", schema);
