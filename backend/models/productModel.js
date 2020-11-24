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
  image: {
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
  countInStock: {
    type: Number,
    required: true,
    default: 0
  }
}, { timestamps: true });

const CT_Product = mongoose.model('CT_Product', productSchema);

export default CT_Product