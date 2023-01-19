const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim: true
    },
    description:{
        type: String,
        required: true,
        trim:true
    },
    addedAt:{
        type: Date,
        //required: true
    },
    eventImage:{
        type: String,
        //required: true
    },
    host: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Host',
       // required: true
    },
    campus: {
        type: String,
        required: true
    },
    ticketPrice: {
        type: Number
    },
    data:{
    type: Array,
    trim: true
    }
    
})

module.exports = mongoose.model('Event', eventSchema);
