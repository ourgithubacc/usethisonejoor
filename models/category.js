const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    category_name:{
        type: String
    },
    createdAt:{
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model("Category", categorySchema);