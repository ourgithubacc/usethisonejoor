const express = require('express')
const {getAllReference, getReferenceById} = require('../controllers/reference')
const router = express.Router()

router.route('/getAllReference').get(getAllReference)
router.route('/getReferenceById/:redId').get(getReferenceById)

module.exports = router