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

// Delete Single Todo

app.delete("/api/react_todo/:id", (request, response) => {
    const { id } = request.params;
    console.log(id);
    TodoModel.findByIdAndDelete(id)
        .then((res) => {
            response.json({
                message: "Todo Deleted Successfully",
                status: true
            })
        })
        .catch((err) => {
            response.json({
                message: `Internal Server Error ${err}`,
                status: false
            })
        })
})

// Edit Todo

app.put("/api/react_todo", (request, response) => {
    const body = request.body;
    const ObjToSend = {
        todo: body.todo,
    }
    TodoModel.findByIdAndUpdate(body.id, ObjToSend)
        .then((data) => {
            response.json({
                message: "Todo Update Sucessfully",
                data: `updated data ${data}`,
                status: true
            })
        }).catch((err) => {
            response.json({
                message: `Internal Server Error ${err}`,
                status: false
            })
        })
});

// DeleteAll

app.delete("/api/react_todo", (request, response) => {
    TodoModel.deleteMany()
        .then((res) => {
            response.json({
                message: "Data Deleted Sucessfully",
                status: true
            })
        }).catch((err) => {
            response.json({
                message: `Internal Server Error ${err}`,
                status: true
            })
        })
})

app.listen(port, () => console.log(`Server running on PORT ${port}`))