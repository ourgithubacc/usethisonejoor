//const { __esModule } = require('firebase-tools/lib/logger')
const mongoose = require('mongoose')

const ticketSchema = mongoose.Schema({
    token : {
        type: String,
        required: true
    },
    qrCode:{
        type: String,
        required: true
    },
    email:{
        type:String,
        trim:true
    }
})

module.exports = mongoose.model('Ticket',ticketSchema);