import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ShopListSchema = new Schema({
  name: { type: String, required: true },
  createdAt: { type: Date, required: true },
  items: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      category: { type: String, required: true },
    },
  ],
});

export const ShopListModel = mongoose.model("shopList", ShopListSchema);
