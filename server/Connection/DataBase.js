const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config()
const DB_URL = process.env.DB_URL

const DataBase =
    mongoose.connect(DB_URL).then(() => {
        console.log(" Connected To Electronics DataBase")
    })
    .catch(
        (error) => {
            console.log("Error To Connection DataBase" + error)
                // res.status(404).send({ message: "error to connection" })
            exit(1)
        }
    )


module.exports = DataBase;