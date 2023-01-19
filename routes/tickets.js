const express = require('express');
const { checkTicket, getAllTickets, getTicketById, deleteTicketById, mailTempToken, getTicketByToken} = require('../controllers/tickets')
const router = express.Router();


//router.route('/sendEventTicket/:userId').post(sendEventTicket)
//router.route('/getEventTicket/:userId').get(getEventTicket)

router.route('/tempToken').post(mailTempToken)
router.route('/getTicketByToken').get(getTicketByToken)
//router.route('/generateAndSaveTicket/:userId').post(generateAndSaveTicket)
router.route('/getAllTickets').get(getAllTickets)
router.route('/getTicketById/:ticketId').get(getTicketById)
router.route('/checkToken').get(checkTicket);
router.route('/deleteTicketById/:ticketId').delete(deleteTicketById)
module.exports = router