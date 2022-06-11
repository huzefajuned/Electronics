const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "HUzefaBinJunedDeveloper"
const middleAuth = require('../middleware/middleAuth')



require('../Connection/DataBase');
const User = require('../Models/userSchema');

//Regsiter Route.......

router.post("/User/Register", async (req, res) => {

    const { name, email, password } = req.body;

    try {

        const userExist = await User.findOne({ email });
        if (userExist) {
            res.status(400).json({ message: "Email Exists" });
            return;
        }

        const salt = await bcrypt.genSalt(10);
        const secPassword = await bcrypt.hash(password, salt)

        const newUser = await new User({
            name: name,
            email: email,
            password: secPassword,
        })

        const user = await newUser.save();
        if (user) {
            res.status(200).json({ message: "user Registered Successfully" });
        }


    } catch (error) {
        res.status(401).json({ message: "Internal Server Error " });

    }

})


//Regsiter Route.......
// router.post("/User/Register", [
//     body('name', "Enter a Valid Name").isLength({ min: 5 }),
//     body('email', "Enter A Valid Email").isEmail(),
//     body('password', "Enter Password Atleast 5 Characters").isLength({ min: 5 }),
// ], async (req, res) => {
// const errors = validationResult(req);
// if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
// }
// const { name, email, password } = req.body;

// try {
// const userExist = await User.findOne({ email });
// if (userExist) {
//     res.status(400).json({ Message: "already Regd" })
// }
// const salt = await bcrypt.genSalt(10);
// const secPassword = await bcrypt.hash(password, salt)

// const newUser = await new User({
//     name: name,
//     email: email,
//     password: secPassword
// })
// const user = await newUser.save();
// const data = {
//     user: {
//         id: user.id
//     }
// }
// const authtoken = jwt.sign(data, JWT_SECRET);
// res.json({ authtoken });
// console.log("authtoken", authtoken)

// console.log(userRegister);
// if (!userRegister) {
//     res.status(402).json({ Message: "User Registration Error" })
// }
//     } catch (error) {
//         res.status(500).send("Internsal Server Error")
//     }
// })


//Login Route...
router.post('/User/Login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const userLogin = await User.findOne({ email });
        if (!userLogin) {
            return res.status(401).json({ Message: "Invalid Credentials" });
        }
        const passwordCompare = bcrypt.compare(password, userLogin.password);

        if (!passwordCompare) {

            return res.status(402).json({ Message: "Invalid Credentials" });
        }
        const data = {
            user: {
                id: userLogin.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET,
            // { expiresIn: "500s" }
        );
        res.json({ authtoken });
        console.log("authtoken", authtoken)
        // console.log("User Data", data.user);
        // console.log("User Token", authtoken);


        // localStorage.setItem("JWTAUTHTOKEN", authtoken);

    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error")
    }

})


//Get Logged In User DEtails ....

router.get("/User/getUser", middleAuth, async (req, res) => {
    try {
        userId = req.user.id;

        const user = await User.findById(userId).select("-password");
        console.log("Current Logged UserId-", userId);
        res.send(user);
        // console.log("user",user)
    } catch (error) {
        console.log(error);
        res.send("An error occured");
    }
})

module.exports = router;