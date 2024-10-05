import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    lastVisitedDate: {
      type: Date,
      default: Date.now,
    },
    lastPurchaseAmount: {
      type: Number,
      default: 0,
    },
    lifetimePurchaseAmount: {
      type: Number,
      default: 0,
    },
    address: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Customer = mongoose.model("Customer", customerSchema);

export default Customer;