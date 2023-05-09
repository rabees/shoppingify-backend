import express from "express";
import {
  createShopList,
  getTopSellingItemsByField,
  getItemsSelledByMonth,
  getShopLists,
  getSingleShopList,
} from "../controllers/ShopListController.js";

const shopListRouter = express.Router();

shopListRouter.route("/topProductsByMonth").get(getItemsSelledByMonth);
shopListRouter.route("/").get(getShopLists).post(createShopList);
shopListRouter.route("/topItemsByField/:field").get(getTopSellingItemsByField);
shopListRouter.route("/:id").get(getSingleShopList);

export default shopListRouter;
