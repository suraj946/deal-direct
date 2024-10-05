import mongoose from "mongoose";
import Customer from "../models/customer.js";

export const createCustomer = async (req, res) => {
  const { name, email, phone, lastPurchaseAmount, address } = req.body;

  if (!name || !email || !phone) {
    return res
      .status(400)
      .json({ message: "Name, email, and phone are required." });
  }

  try {
    const newCustomer = new Customer({
      name,
      email,
      phone,
      lastPurchaseAmount,
      address,
      lifetimePurchaseAmount: lastPurchaseAmount,
    });

    await newCustomer.save();
    return res.status(201).json({
      message: "Customer created successfully",
      customer: newCustomer,
    });
  } catch (error) {
    if (error.code === 11000) {
      const field = error.keyPattern.email ? "email" : "phone";
      return res
        .status(409)
        .json({ message: `Customer with this ${field} already exists.` });
    }
    return res
      .status(500)
      .json({ message: "Failed to create customer", error: error.message });
  }
};

export const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    return res.status(200).json(customers);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to fetch customers", error: error.message });
  }
};

export const getCustomerById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid customer ID" });
  }

  try {
    const customer = await Customer.findById(id);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    return res.status(200).json(customer);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to fetch customer", error: error.message });
  }
};

export const updateCustomer = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    email,
    phone,
    lastVisitedDate,
    lastPurchaseAmount,
    address,
  } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid customer ID" });
  }

  const dataToUpdate = {};
  if (name) dataToUpdate.name = name;
  if (email) dataToUpdate.email = email;
  if (phone) dataToUpdate.phone = phone;
  if (lastVisitedDate) dataToUpdate.lastVisitedDate = lastVisitedDate;
  if (lastPurchaseAmount) dataToUpdate.lastPurchaseAmount = lastPurchaseAmount;
  if (address) dataToUpdate.address = address;

  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(id, dataToUpdate, {
      new: true,
      runValidators: true,
    });

    if (!updatedCustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    if (lastPurchaseAmount) {
      updatedCustomer.lifetimePurchaseAmount += lastPurchaseAmount;
      await updatedCustomer.save();
    }

    return res.status(200).json({
      message: "Customer updated successfully",
      customer: updatedCustomer,
    });
  } catch (error) {
    if (error.code === 11000) {
      const field = error.keyPattern.email ? "email" : "phone";
      return res
        .status(409)
        .json({ message: `Customer with this ${field} already exists.` });
    }
    return res
      .status(500)
      .json({ message: "Failed to update customer", error: error.message });
  }
};

export const deleteCustomer = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid customer ID" });
  }

  try {
    const deletedCustomer = await Customer.findByIdAndDelete(id);
    if (!deletedCustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    return res.status(200).json({ message: "Customer deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to delete customer", error: error.message });
  }
};
