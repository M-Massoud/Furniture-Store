const mongoose = require('mongoose');

// A- craete schema object
const schema = new mongoose.Schema({
  _id: { type: mongoose.Types.ObjectId, auto: true },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

//B- mapping

//setter
mongoose.model('admin', schema);
