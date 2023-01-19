const express = require('express')
const {sendToAll} = require('../controllers/notification')
//const fetch = require('node-fetch')
const router = express.Router()

router.route('/sendToAll').post(sendToAll);

module.exports = router;