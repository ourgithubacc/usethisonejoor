const mongoose = require('mongoose');

const hostSchema = mongoose.Schema({
    host_name:{
        type: String
    },
    createdAt:{
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Host', hostSchema);