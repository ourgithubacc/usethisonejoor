const mongoose = require('mongoose')

const tokenSchema = mongoose.Schema({
    token:{
        type: String,
        required: true,
        maxlength: 32,
        trim: true,
        
    },
    isUsed:{
        type: Boolean,
        trim: true,
        required: true
    },
    expiryDate:{
        type: Date,
        trim:true
    },
    email:{
        type: String,
        trim:true
    },
    reference:{
        type: String,
        trim:true
    }
})

module.exports =  mongoose.model("Token", tokenSchema);
