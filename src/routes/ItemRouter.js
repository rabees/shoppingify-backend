import express from "express";
import {
  getAllItems,
  postItem,
  getSingleItem,
  getCategories,
  deleteItem,
} from "../controllers/ItemController.js";

const itemRouter = express.Router();

itemRouter.route("/").get(getAllItems).post(postItem);
itemRouter.route("/categories").get(getCategories);
itemRouter.route("/:id").get(getSingleItem).delete(deleteItem);

export default itemRouter;
