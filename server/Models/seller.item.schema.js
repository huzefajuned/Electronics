const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  product_SellerID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "seller_item_db",
  },
  product_Name: {
    type: String,
  },
  product_Price: {
    type: Number,
  },
  product_Thumbnail: {
    type: Array,
  },
  product_Images: {
    type: Array,
  },
  product_Category: {
    type: String,
  },
  product_shortDescription: {
    type: String,
  },
  product_longDescription: {
    type: String,
  },
  product_Quantity: {
    type: String,
  },
});

const sellerItemSchema = mongoose.model("seller_item_db", itemSchema);
module.exports = sellerItemSchema;
