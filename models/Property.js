import mongoose from "mongoose";
const PropertySchema = new mongoose.Schema(
  {  
  type: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  Desc: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  superficial: {
    type: Number,
    required: true,
  },
  photos: {
    type: [String],
  },
  Prix: {
    type: Number,
    required: true,
  },
 
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  featured: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("property", PropertySchema)