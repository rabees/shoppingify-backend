import { ItemModel } from "../models/ItemModel.js";

export const getAllItems = async (req, res) => {
  const data = await ItemModel.find();
  res.send(data);
};

export const getSingleItem = async (req, res) => {
  const data = await ItemModel.findById(req.params.id);
  res.send(data);
};

export const postItem = async (req, res) => {
  console.log(req.body);
  await ItemModel.create(req.body);
  res.send("Created successfully");
};
export const getCategories = async (req, res) => {
  const data = await ItemModel.find().distinct("category");
  res.send(data);
};

export const deleteItem = async (req, res) => {
  await ItemModel.deleteOne({ _id: req.params.id });
  res.send("Deleted succesfully");
};
