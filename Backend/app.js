const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 4000;
const mongoose = require("mongoose");
const TodoModel = require("./models/todoSchema");
// const TodoModel = require("./models/todoSchema");
const mongoDBURI = "";
const cors = require("cors")

app.use(cors())
app.use(express.json())

mongoose.connect(mongoDBURI)
    .then((res) => {
        console.log("MongoDB Connected Successfully");
    }).catch((err) => {
        console.log("Oops!", err)
    })

// Add TODO

app.post("/api/react_todo", (request, response) => {
    const body = request.body;
    const ObjToSend = {
        todo: body.todo,
    }
    TodoModel.create(ObjToSend)
        .then((data) => response.json({
            message: "Data Send Successfully",
            status: true,
            data
        })).catch((err) => {
            response.json({
                message: `Internal Server Error ${err}`,
                status: false
            })
        })
    console.log(body)
})

// GET TODO DATA

app.get("/api/react_todo", ((request, response) => {
    TodoModel.find({})
        .then((data) => {
            response.json({
                message: "Data Get Succesfully",
                status: true,
                data, data
            })
        }).catch((err) => {
            response.json({
                message: `Internal Server Error ${err}`,
                status: false
            })
        })
}))

app.listen(port, () => console.log(`Server running on PORT ${port}`))