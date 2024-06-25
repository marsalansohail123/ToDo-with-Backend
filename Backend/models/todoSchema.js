const mongoose = require("mongoose");

const mongooseSchema = mongoose.Schema({
    todo: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const TodoModel = mongoose.model("Todo", mongooseSchema);
module.exports = TodoModel;