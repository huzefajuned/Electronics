const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authBuyerSchema = require("../Models/auth.buyer.schema");
const config = "mysecretkeyishere";

// $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ buyerRegister......
const buyerRegister = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      res.status(401).send({ message: "all fields are required" });
      return;
    }
    const exist = await authBuyerSchema.findOne({ email: req.body.email });
    if (exist) {
      // res.status(400).send({ message: "exists" });
      res.status(400).send({ message: "user exisits" });
      return;
    }
    //hashing password using bcrypt.js
    const salt = await bcrypt.genSaltSync(10);
    const secPassword = await bcrypt.hashSync(password, salt);
    const buyer = await new authBuyerSchema({
      name: req.body.name,
      email: req.body.email,
      password: secPassword,
    });
    const newBuyer = await buyer.save();
    if (newBuyer) {
      res.status(201).send({ message: "user created" });
    }
    console.log(newBuyer);
  } catch (error) {
    res.status(500).send({ message: "internal server error" });
  }
};
// $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ buyerLogin......

const buyerLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).send({ message: "Fields are Required" });
    return;
  }
  const buyerLogin = await authBuyerSchema.findOne({ email });
  if (buyerLogin) {
    const { password, ...buyerpassword } = buyerLogin;
    const comparePass = await bcrypt.compare(
      req.body.password,
      buyerLogin.password
    );
    // delete buyerLogin.password;

    if (comparePass) {
      jwt.sign(
        { buyerLogin },
        config,
        {
          algorithm: "HS256",
          expiresIn: "120s",
        },
        (err, token) => {
          buyerLogin.password = undefined;
          res
            .status(201)
            .send({ buyerLogin, auth: token, message: "Buyer Logged In!" });
          // console.log(token.auth)
        }
      );
    } else {
      res.status(202).send({ message: "Wrong username or password." });
    }
  } else {
    res.status(202).send({ message: "Not a buyer" });
  }
};

module.exports = { buyerRegister, buyerLogin };
