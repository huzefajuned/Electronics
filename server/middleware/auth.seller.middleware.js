const jwt = require("jsonwebtoken");
const config = "mysecretkeyishere";

const verifySellerToken = (req, res, next) => {
  let token = req.headers[`authorization`];

  if (token) {
    token = token.split(" ")[1];
    jwt.verify(token, config, (err, user) => {
      // console.log("innerToken",token)

      if (err) {
        res.send({ message: "plase provide a  auth token" });
      } else {
        req.user = user;
        // res.send({ message: "seller authenticated" });
        next();
      }
    });
  } else {
    res.status(200).send({ message: "plase add valid token" });
  }
};

module.exports = verifySellerToken;
