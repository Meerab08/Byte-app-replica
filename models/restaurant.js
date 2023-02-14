const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  // _id: new mongoose.Types.ObjectId(),
  name: {
    type: String,
    required: true,
  },
  image: {
    type: "String",
  },
  location: {
    type: "String",

  },
  category:[{type: mongoose.Types.ObjectId, ref: "Category"}]
});

module.exports = mongoose.model("Restaurant", restaurantSchema);
