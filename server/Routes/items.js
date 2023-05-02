const express = require("express");
const router = express.Router();
const sellerItemSchema = require("../Models/seller.item.schema");

router.get("/allItems", async (req, res) => {
  const page = req.query.page ? parseInt(req.query.page) : 1;
  const size = req.query.size ? parseInt(req.query.size) : 10;
  const skip = (page - 1) * size;

  try {
    const totalItems = await sellerItemSchema.countDocuments();

    const itemsPerPage = await sellerItemSchema.find().skip(skip).limit(size);
    res.json({
      totalItems,
      totalPages: Math.ceil(totalItems / size),
      itemsPerPage,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});

module.exports = router;
