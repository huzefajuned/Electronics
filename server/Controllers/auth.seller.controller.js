// const bcrypt = require("bcrypt")
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AuthSellerSchema = require("../Models/auth.seller.schema");

const config = "mysecretkeyishere";

//CRAETING sellerRegsiter CONTROLLER
const sellerRegister = async (req, res) => {
  const { name, email, password, isVerifiedSeller } = req.body;
  try {
    if (!name || !email || !password) {
      res.status(400).send({ message: "Incompleted Credentials ❌ " });
      return;
    }
    const alreadySeller = await AuthSellerSchema.findOne({
      email: req.body.email,
    });
    if (alreadySeller) {
      res.status(202).send({ message: "Already a seller ✔️" });
      return;
    }

    //HASHING PASSWORD bcrypt.js
    const salt = await bcrypt.genSaltSync(10);
    const secPassword = await bcrypt.hashSync(password, salt);

    const authSeller = new AuthSellerSchema({
      name: req.body.name,
      email: req.body.email,
      password: secPassword,
      isVerifiedSeller: false,
    });
    const newSeller = await authSeller.save();

    if (newSeller) {
      res.status(201).send({ message: "Registered successfully ✔️" });
    }
  } catch (error) {
    res.status(500).send({ message: "internal server error" });
  }
};

//creating adminLogin controller
const sellerLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      res.status(200).send({ message: "Incomplete Credentials ❌" });
      return;
    }
    const sellerLogin = await AuthSellerSchema.findOne({
      email: req.body.email,
    });

    if (sellerLogin) {
      const { password, isVerifiedSeller, ...respllerLogin } = sellerLogin;

      if (sellerLogin.isVerifiedSeller === true) {
        const comparePass = await bcrypt.compare(
          req.body.password,
          sellerLogin.password
        );
        if (comparePass) {
          const token = jwt.sign(
            { email: sellerLogin.email, id: sellerLogin._id },
            config,
            { expiresIn: "24h" }
          );
          sellerLogin.password = undefined;

          res
            .status(201)
            .send({ auth: token, sellerLogin, message: "Seller Logged In ✔️" });
        } else {
          res.status(202).send({ message: "Invalid Credentials ❌" });
        }
      } else {
        res
          .status(400)
          .send({
            message:
              "Not a Verified Seller. Please Wait Until your seller Account is completely Verified.  ⌛",
          });
      }
    } else {
      res.status(400).send({ message: "Not a Seller ❌" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

module.exports = { sellerRegister, sellerLogin };
