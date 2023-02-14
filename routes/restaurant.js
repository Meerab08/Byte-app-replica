const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Restaurant = require("../models/restaurant");

router.get("/", async (req, res) => {
  try {
    // console.log("user route");
    const restaurants = await Restaurant.find();
    console.log("Restaurants: ", JSON.stringify(restaurants));
    // res.send(users.length);
    res.json({ restaurants });
  } catch (err) {
    res.send("Error: ", err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    console.log("Restaurant route");
    const restaurant = await Restaurant.findById(req.params.id);
    res.json({ restaurant });
  } catch (err) {
    res.send(err);
  }
});

router.post("/", async (req, res) => {
  const { name, image, location } = req.body;
  const restaurant = new Restaurant({
    name,
    image,
    location,
  });
  console.log(restaurant);
  try {
    const a1 = await restaurant.save();
    res.json(a1);
  } catch (err) {
    res.send(err);
  }
});

router.patch("/update/:id", async (req, res) => {
  try {
    console.log("id: ", req.params.id);
    console.log("name: ", req.body.name);
    const restaurant = await Restaurant.updateMany(
      { _id: req.params.id },
      { $set: { name: req.body.name }, $set: { image: req.body.image } }
    );
    console.log("hello: ", restaurant);
    res.send(restaurant);
  } catch (error) {
    res.send("Error show ");
  }
});

module.exports = router;
