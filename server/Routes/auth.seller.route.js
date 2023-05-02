const express = require('express');
const router = express.Router();

const middleware = require('../middleware/auth.seller.middleware')

const authSellerController = require("../Controllers/auth.seller.controller");

//for admin-register
router.post("/sellerRegister", authSellerController.sellerRegister);

//for admin-login
router.post("/sellerLogin", authSellerController.sellerLogin);

// router.get("/sellerLogin", middleware.checkToken, authSellerController.index);



module.exports = router;