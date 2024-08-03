const mongoose = require('mongoose');
const productSchema = mongoose.Schema({
  image: {
    type: Buffer,
    required: true,
  },
  name: {
    type: String,
    required: true, 
    minLength: 3,
    trim: true,
  },
  price: {
    type: Number,
    required: true, 
  },
  discount: {
    type: Number,
    default: 0,
  },
  bgcolor: {
    type: String,
    required: true, 
    trim: true,
  },
  panelcolor: {
    type: String,
    required: true, 
  },
  textcolor: {
    type: String,
    required: true, 
  },
});

module.exports = mongoose.model('Product', productSchema);