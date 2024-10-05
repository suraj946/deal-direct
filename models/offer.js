import mongoose from "mongoose";
const offerSchema = new mongoose.Schema(
  {
    offerName: {
      type: String,
      required: true,
    },
    offerDescription: {
      type: String,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
    deadline: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Offer = mongoose.model("Offer", offerSchema);

export default Offer;