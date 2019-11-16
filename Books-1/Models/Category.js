const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name: String,
    ordering: Number,
    active: Boolean,
    idBooks: [{type:mongoose.Schema.Types.ObjectId}]
});

module.exports = mongoose.model("Category", categorySchema);