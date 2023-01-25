const axios = require('axios')
const User = require("../models/user");
const Event = require("../models/event")
const paystack = require('paystack')('sk_test_833a73fab5a13cf8f7a2b7e8d3b2f65e6abfb84a');
const Ref = require('../models/reference')
const {sendEmail} = require('../helper/sendEmail')
require('dotenv').config()


async function initEventPay(req,res){
    try{    

        const {email, title} = req.body

        
        const user = await User.findOne({email:email},(err,email)=>{
            if(err|| !email){
                console.log(err);
                return res.status(403).json({
                    error:err
                })
            }
        })
        const event = await Event.findOne({title:title},(err,title)=>{
            if(err || !title){
                console.log(err);
                return res.status(403).json({
                    error: err
                })
            }
        })
        
        


        
        const amountinkobo = event.ticketPrice;
        let reference;

            paystack.transaction.initialize({
                email:     user.email,        // a valid email address
                amount:    amountinkobo, // only kobo and must be integer
                metadata:  {
                    "pay_for": "ticket"
                }
            },function(error, body) {
                if(error){
                    res.send({error:error});
                    return;
                }
                reference = body.data.reference
                res.send(body.data);
                const ref =  new Ref({
                ref:reference
                }).save()
                

            });
           
            
}catch(error){
    console.log(error)
}
}


async function verifyPayment (req,res){
    try {
        var reference = req.params.reference;

        paystack.transaction.verify(reference,
            function(error, body) {
            if(error){
                res.send({error:error});
                return;
            }
            if(body.data.success){
                // save authorization
                var auth = body.authorization;
            }
            res.send(body.data.gateway_response);
        });
    } catch (error) {
        console.log(error)
        
    }
}



module.exports = {
    initEventPay,
    verifyPayment
}
