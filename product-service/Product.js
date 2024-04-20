const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: String,
  tags: String,
  description: String,
  price: Number,
  created_by: String,
  img_url: String,
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = Product = mongoose.model("product", ProductSchema);
