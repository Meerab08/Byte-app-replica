const express = require("express");
const router = express.Router();
const Category = require("../models/category");
const Restaurant = require("../models/restaurant");

router.get("/", async (req, res) => {
  try {
    // const categories = await Category.find();
    const categories = await Category.find({}).populate("restaurant")
    console.log("Categories: ", JSON.stringify(categories));
    res.json({ categories });
  } catch (error) {
    res.send(error);
  }
});

router.post("/", async (req, res) => {
  const { name, price, quantity } = req.body;
  const restaurant = await Restaurant.create({ name: 'kitchenExpert'})
  const category = await Category.create({
    name,
    price,
    quantity,
    restaurant
  });
  console.log("Category: ", category);
  try {
    res.send(category);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
