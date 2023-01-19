const express = require('express')
const {handleWebhook, getAllWebhookEvents} = require('../controllers/webhook')
const router = express.Router();


router.route('/webhook').post(handleWebhook);
router.route('/getAllWebhookEvents').get(getAllWebhookEvents)

module.exports = router