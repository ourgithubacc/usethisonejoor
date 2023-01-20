const mongoose = require('mongoose')

const newsSchema = mongoose.Schema({
    title:{
        type: String
    },
    content:{
        type: String
    },
    url:{
        type:Object
    },
//     newsImage:{
//         type: String,
       
//     },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    addedAt: {
        type: Date
    },
    campus: {
        type: String,
        required: true
    },
    data:{
        type:Array,
        trim:true
    }
})


module.exports = mongoose.model('News',newsSchema);
