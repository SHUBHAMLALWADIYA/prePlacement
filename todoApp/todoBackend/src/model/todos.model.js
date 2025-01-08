const mongoose = require("mongoose");

const todosSchema = mongoose.Schema(
    {
        title: { type: String, required: true },
        date: { type: Date, default: Date.now },
        status: { type: Boolean,default:false},
        userId:{type:String}
    },
    { versionKey: false }
);

const TodoModel = mongoose.model("todos", todosSchema);

module.exports = TodoModel;
