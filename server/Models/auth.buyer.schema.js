const mongoose = require("mongoose");

const buyerSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
});
const authBuyerSchema = mongoose.model("Auth_Buyer_DB", buyerSchema);
module.exports = authBuyerSchema;
