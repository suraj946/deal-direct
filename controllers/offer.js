import mongoose from "mongoose";
import Offer from "../models/offer.js";
export const createOffer = async (req, res) => {
  const {
    offerName,
    offerDescription,
    discount,
    price,
    productName,
    deadline,
  } = req.body;

  if (
    !offerName ||
    !offerDescription ||
    !discount ||
    !price ||
    !productName ||
    !deadline
  ) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const newOffer = new Offer({
      offerName,
      offerDescription,
      discount,
      price,
      productName,
      deadline,
    });

    await newOffer.save();
    return res
      .status(201)
      .json({ message: "Offer created successfully", offer: newOffer });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to create offer", error: error.message });
  }
};

export const getOffers = async (req, res) => {
  try {
    const offers = await Offer.find();
    return res.status(200).json(offers);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to fetch offers", error: error.message });
  }
};

export const getOfferById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid offer ID" });
  }

  try {
    const offer = await Offer.findById(id);
    if (!offer) {
      return res.status(404).json({ message: "Offer not found" });
    }
    return res.status(200).json(offer);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to fetch offer", error: error.message });
  }
};

export const updateOffer = async (req, res) => {
  const { id } = req.params;
  const {
    offerName,
    offerDescription,
    discount,
    price,
    productName,
    deadline,
  } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid offer ID" });
  }

  const dataToUpdate = {};
  if (offerName) dataToUpdate.offerName = offerName;
  if (offerDescription) dataToUpdate.offerDescription = offerDescription;
  if (discount) dataToUpdate.discount = discount;
  if (price) dataToUpdate.price = price;
  if (productName) dataToUpdate.productName = productName;
  if (deadline) dataToUpdate.deadline = deadline;

  try {
    const updatedOffer = await Offer.findByIdAndUpdate(id, dataToUpdate, {
      new: true,
      runValidators: true,
    });

    if (!updatedOffer) {
      return res.status(404).json({ message: "Offer not found" });
    }

    return res
      .status(200)
      .json({ message: "Offer updated successfully", offer: updatedOffer });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to update offer", error: error.message });
  }
};

export const deleteOffer = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid offer ID" });
  }

  try {
    const deletedOffer = await Offer.findByIdAndDelete(id);
    if (!deletedOffer) {
      return res.status(404).json({ message: "Offer not found" });
    }
    return res.status(200).json({ message: "Offer deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to delete offer", error: error.message });
  }
};
