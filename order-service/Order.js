const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  productsForOrderDetails: [
    {
      product_id: String,
      name: String,
      price: Number,
      quantity: Number,
    },
  ],
  userEmail: String,
  userAddress: String,
  total_price: Number,
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = Order = mongoose.model("order", OrderSchema);
