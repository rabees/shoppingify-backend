import { ShopListModel } from "../models/ShopListModel.js";

export const createShopList = async (req, res) => {
  console.log(req.body);
  try {
    await ShopListModel.create(req.body);
  } catch (e) {
    console.log(e);
  }
  res.send("Created successfully");
};

export const getTopSellingItemsByField = async (req, res) => {
  try {
    const field = req.params.field;
    console.log(field);
    const data = await ShopListModel.aggregate([
      { $unwind: "$items" },
      {
        $group: {
          _id: `$items.${field}`,
          total: {
            $sum: "$items.quantity",
          },
        },
      },
      {
        $group: {
          _id: null,
          totalItems: { $sum: "$total" },
          items: {
            $push: {
              name: "$_id",
              quantity: "$total",
            },
          },
        },
      },
      { $unwind: "$items" },
      {
        $project: {
          name: "$items.name",
          percentage: {
            $round: [
              {
                $multiply: [
                  { $divide: ["$items.quantity", "$totalItems"] },
                  100,
                ],
              },
              1,
            ],
          },
        },
      },
      {
        $sort: {
          percentage: -1,
        },
      },
      { $limit: 3 },
    ]);
    res.send(data);
  } catch (e) {
    console.log(e);
  }
};

export const getItemsSelledByMonth = async (req, res) => {
  try {
    const data = await ShopListModel.aggregate([
      { $unwind: "$items" },
      {
        $group: {
          _id: {
            month: { $month: `$createdAt` },
            year: { $year: `$createdAt` },
          },
          total: {
            $sum: "$items.quantity",
          },
        },
      },

      {
        $sort: {
          "_id.month": 1,
          "_id.year": 1,
        },
      },
      {
        $limit: 7,
      },
    ]);
    res.send(data);
  } catch (e) {
    console.log(e);
  }
};

export const getShopLists = async (req, res) => {
  try {
    const data = await ShopListModel.aggregate([
      {
        $group: {
          _id: {
            month: { $month: `$createdAt` },
            year: { $year: `$createdAt` },
          },
          shopLists: {
            $push: {
              name: "$name",
              createdAt: "$createdAt",
              id: "$_id",
            },
          },
        },
      },

      {
        $sort: {
          "_id.month": -1,
          "_id.year": -1,
        },
      },
    ]);
    res.send(data);
  } catch (e) {
    console.log(e);
  }
};


export const getSingleShopList = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await ShopListModel.findById(id);
    res.send(data);
  } catch (e) {
    console.log(e);
    res.send("An error has occurred");
  }
};
