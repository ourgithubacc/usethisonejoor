// const express = require('express')
// const axios = require('axios')
// const url = require('url')

// async function sendTicket (email,subject,body,fromName,replyTo,event_Id){
//     try{    
//     const json ={
//         email:email,
//         subject:subject,
//         body:body,
//         fromName:fromName,
//         replyTo:replyTo
//     }

//     let eventId = {eventId: event_Id }

//     const params = new url.URLSearchParams(eventId);
//     const baseUrl = `https://apis.ticket-generator.com/client/v1/ticket/send?${params}`;
    
//     await axios.post(baseUrl,json);

// } catch(error){
//     console.log(error)
// }
// }

// module.exports = sendTicket