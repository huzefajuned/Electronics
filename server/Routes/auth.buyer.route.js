const express = require("express");
const router = express.Router();

const authBuyerController = require("../Controllers/auth.buyer.controller");

router.post("/buyerRegister", authBuyerController.buyerRegister);
router.post("/buyerLogin", authBuyerController.buyerLogin);

module.exports = router;
