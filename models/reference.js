const mongoose = require ('mongoose')

const refSchema = mongoose.Schema({
    ref:{
        type: String
    }
})

module.exports = mongoose.model('Ref',refSchema)