const express = require("express");
const router = express.Router();

const sellerItemController = require("../Controllers/seller.item.controller");
const verifySellerToken = require("../middleware/auth.seller.middleware");

//createing a new item

router.post(
  "/createSellerItem",
  verifySellerToken,
  sellerItemController.upload.fields([
    { name: "product_Thumbnail", maxCount: 1 },
    { name: "product_Images", maxCount: 4 },
  ]),

  sellerItemController.insert
);

//Retriving all items
router.get("/getSellerItem", verifySellerToken, sellerItemController.read);

//  filtering  item through search
router.get("/item/search/:model", sellerItemController.seacrh);

//Retriving all itemss
// router.get("/allItems", sellerItemController.read);

//Deleting an item using Id
router.delete("/item/:id", verifySellerToken, sellerItemController.deleteById);

//Updating an item using Id
router.put("/item/:id", verifySellerToken, sellerItemController.updateById);

module.exports = router;
