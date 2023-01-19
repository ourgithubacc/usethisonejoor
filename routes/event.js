const express =  require('express')
const {uploadEvent, getAllEvents, getEventById, getEventsByHost, deleteEventById, updateEventById, getIperuCampusEvents, getMainCampusEvent} = require('../controllers/event')
const router = express.Router();
const upload = require('../controllers/multer')
router.route('/uploadEvent',upload.array('eventImage')).post(uploadEvent);
router.route('/getAllEvents/:pageNo/:pageSize').get(getAllEvents);
router.route('/getEventbyId/:eventId').get(getEventById);
router.route('/getEventsByHost/:hostId').get(getEventsByHost);
router.route('/deleteEventById/:eventId').delete(deleteEventById);
router.route('/updateEventById/:eventId').put(updateEventById);
router.route('/getIperuCampusEvents/:pageNo/:pageSize').get(getIperuCampusEvents)
router.route('/getMainCampusEvents/:pageNo/:pageSize').get(getMainCampusEvent)

module.exports = router;
