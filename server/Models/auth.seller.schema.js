const mongoose = require("mongoose");

const sellerSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  isVerifiedSeller: Boolean,
});

const authSellerSchemas = mongoose.model("Auth_Seller_DB", sellerSchema);
module.exports = authSellerSchemas;
