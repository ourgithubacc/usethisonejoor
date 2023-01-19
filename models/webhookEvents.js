const mongoose = require('mongoose')


const webhookEventSchema = mongoose.Schema({
    webhookEvent:{
        type: Object
    }
})


module.exports = mongoose.model('WebhookEvents', webhookEventSchema);