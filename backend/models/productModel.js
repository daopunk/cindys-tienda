import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'CT_User'
  },
  name: {
    type: String,
    required: true
  },
  image1: {
    type: String,
    required: false
  },
  image2: {
    type: String,
    required: false
  },
  image3: {
    type: String,
    required: false
  },
  image4: {
    type: String,
    required: false
  },
  image5: {
    type: String,
    required: false
  },
  category: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: false
  },
  rating: {
    type: Number,
    required: false,
    default: 0
  },
  price: {
    type: Number,
    required: true,
    default: 0
  },
  shipping: {
    type: Number,
    required: true,
    default: 0
  },
  countInStock: {
    type: Number,
    required: true,
    default: 0
  },
  option1: {
    type: String,
    required: false
  },
  option2: {
    type: String,
    required: false
  },
  option3: {
    type: String,
    required: false
  },
  option4: {
    type: String,
    required: false
  },
  frame1: {
    type: String,
    required: false
  },
  frame2: {
    type: String,
    required: false
  },
  frame3: {
    type: String,
    required: false
  },
}, { timestamps: true });

const CT_Product = mongoose.model('CT_Product', productSchema);

export default CT_Product