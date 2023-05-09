import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import cors from "cors";
import itemRouter from "./src/routes/ItemRouter.js";
import shopListRouter from "./src/routes/shopListRouter.js";
const app = express();
const port = process.env.PORT || 3001;

mongoose.connect(process.env.URI);
app.use(cors());
app.use(express.json());

app.use("/items", itemRouter);
app.use("/shopList", shopListRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, async () => {
  console.log(`Example app listening on port ${port}`);
});
