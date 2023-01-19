const express = require('express');
const {addHost, getAllHosts, deleteHostById, updateHostById} = require('../controllers/host');
const router = express.Router()

router.route('/addHost').post(addHost);
router.route('/getAllHosts').get(getAllHosts);
router.route('/deleteHostById/:hostId').delete(deleteHostById);
router.route('/updateHostById/:hostId').put(updateHostById);

module.exports = router;