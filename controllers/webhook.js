const crypto  = require ('crypto')
const WebhookEvents = require('../models/webhookEvents')
const Token = require('../models/token')
const Ticket = require('../models/tickets')
const qr = require('qrcode')

const secret = "sk_test_833a73fab5a13cf8f7a2b7e8d3b2f65e6abfb84a"
//const paystack = require('paystack-api')("sk_test_833a73fab5a13cf8f7a2b7e8d3b2f65e6abfb84a")
const {sendEmail} = require('../helper/sendEmail')


    
async function  handleWebhook (req, res)  {
    try{

    
        const hash = crypto.createHmac('sha512', secret).update(JSON.stringify(req.body)).digest('hex')
        if (hash == req.headers['x-paystack-signature']) {
    // Retrieve the request's body
     const  event = await req.body
      const email = await req.body.data.customer.email

      const webHookEvent =  await new WebhookEvents({
        webhookEvent: event
      }).save()
            

      if(event.event === 'charge.success'){    
             const token = await new Token({
                token: ((Math.random() + 1).toString(36).substring(7)).toUpperCase(),
                isUsed: false,
                email
              }).save();

              const qrCode = qr.toString(token.token,(err,qrCodee)=>{return qrCodee})

              const ticket = await new Ticket({
                token: token.token,
                qrCode,
                email:token.email
              }).save();
              const body = `Purchase Successful. Your Ticket has been generated, go to "Ticket" in the profile section of the BUSA app`
              sendEmail(token.email,body,"Payment Successful");
      } 
     

   
    res.json({
        success: true
    });
    
    }

} catch(error){
    console.log(error)
}
}
   


// setTimeout(function(){
//     const stuff2 = handleWebhook()
//     console.log(stuff2)

// },60000)


async function getAllWebhookEvents  (req,res){
    try{
        const webEvents = await WebhookEvents.find({})

    res.status(200).json({
        "success": true,
        "data": webEvents
    })

    } catch (error) {
        res.status(500).json({
            "success": false,
            "data": "Internal Error Occured"
        })
    }
    
}

// exports.verifyEvents = async (req,req) =>{

// }
 
module.exports = {
    handleWebhook,
    getAllWebhookEvents
    
}