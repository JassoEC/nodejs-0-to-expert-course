import mongoose, { Schema } from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    unique: true,
  },
  available: {
    type: Boolean,
    default: true,
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    default: 0,
  },
  description: {
    type: String,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Category is required'],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required'],
  }
})

export const ProductModel = mongoose.model('Product', productSchema);