const multer = require("multer");
const sellerItemSchema = require("../Models/seller.item.schema");
const path = require("path");

//  MULTER STORAGE..
const Storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.basename("client/public/uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: Storage });

// INSERTING NEW PRODUCT TO DATABASE USING '/insert' ROUTE.

const insert = async (req, res) => {
  try {
    console.log("body", req.body.product_SellerID);
    const {
      product_SellerID,
      product_Name,
      product_Price,
      product_shortDescription,
      product_longDescription,
      product_Category,
      product_Thumbnail,
      product_Images,
      product_Quantity,
    } = req.body;
    const newProduct = new sellerItemSchema({
      product_SellerID: req.body.product_SellerID,
      product_Name: req.body.product_Name,
      product_Price: req.body.product_Price,
      product_Category: req.body.product_Category,
      product_shortDescription: req.body.product_shortDescription,
      product_longDescription: req.body.product_longDescription,
      product_Images: req.files["product_Images"],
      product_Thumbnail: req.files["product_Thumbnail"][0],
      product_Quantity: req.body.product_Quantity,
    });
    const finalProd = await newProduct.save();
    console.log("finalProd is ", finalProd);

    if (!finalProd) {
      res.status(400).json({ message: "product Error" });
      // console.log("err");
    } else {
      res.status(201).json({ message: "product saved Successfully" });
    }
  } catch (error) {
    console.log("error iss ", error);
  }
};

//Read Items Realated To A specific Seller.
const read = async (req, res) => {
  console.log("req.body.product_SellerID", req.user.id);

  try {
    await sellerItemSchema
      .find({ product_SellerID: req.user.id })
      .then((result) => {
        // console.log(result)
        res.status(200).json(result);
        // res.json(result)
      })
      .catch((err) => {
        console.log("err", err);
      });
  } catch (error) {
    console.log(error);
  }
};

//  filtering  item through search
const seacrh = (req, res) => {
  try {
    var regex = new RegExp(req.params.model, "i");
    console.log(regex);
    sellerItemSchema.find({ model: regex }).then((result) => {
      res.status(200).json(result);
    });
  } catch (error) {
    console.log(error);
  }
};

//deleting a single item
const deleteById = (req, res) => {
  const id = req.params.id;
  sellerItemSchema.findByIdAndDelete(id).then((data) => {
    console.log(data);
    if (!data) {
      res.status(404).send({
        message: `Cannot delete item with id=${id}. Maybe item was not found!`,
      });
    } else {
      res.send({
        message: "item was updated successfully!",
      });
    }
  });
};

//updating a single item
const updateById = (req, res) => {
  const id = req.params.id;
  sellerItemSchema.findByIdAndUpdate(id).then((data) => {
    console.log(data);
    if (!data) {
      res.status(404).send({
        message: `Cannot update item with id=${id}. Maybe item was not found!`,
      });
    } else {
      res.send({
        message: "item was updated successfully!",
      });
    }
  });
};

const checkT = (req, res) => {
  res.json({ message: "checkTclicked" });
};
module.exports = {
  read,
  seacrh,
  insert,
  deleteById,
  updateById,
  upload,
  checkT,
};
