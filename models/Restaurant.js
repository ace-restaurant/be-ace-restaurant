const mongoose = require("mongoose");

const restaurantSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  keywords: {
    type: Array,
  },
  type: {
    type: String,
  },
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = { Restaurant };
