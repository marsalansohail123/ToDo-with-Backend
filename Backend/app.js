const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 4000;
const mongoose = require("mongoose")
const mongoDBURI = "mongodb+srv://arsalansohail1934:Fa5RG1b2dAqsVqSR@cluster0.kbgfzxu.mongodb.net/";

app.use(express.json())

mongoose.connect(mongoDBURI)
    .then((res) => {
        console.log("MongoDB Connected Successfully");
    }).catch((err) => {
        console.log("Oops!", err)
    })

app.listen(port, () => console.log(`Server running on PORT ${port}`))