const {initEventPay, initProductPay} = require('../helper/paystack')
const User = require("../models/user");
const Ref =  require('../models/reference')
const axios = require('axios')
require('dotenv').config()

exports.payForTicket = async (req,res)=>{
try{
    const user = await User.findById(req.params.userId)

    
     const response = await initEventPay(user.email,5000);

    res.status(200).send({
        checkout_link: response.data.data.authorization_url
    })
} catch (error){
    console.log(error)
    res.status(500).json({
        success:false,
        msg:error
    })
}

   
}

exports.verifyPayments = async (req,res) =>{
    try{

            const ref = await Ref.findById(req.params.refId)
            const token = process.env.PAYSTACK;
            const baseUrl = `https://api.paystack.co/transaction/verify/${ref.ref}`

            const response =  await axios.get(baseUrl,{
                headers: {
                    'Authorization': `Bearer ${token}`
                  },
            })

            res.status(200).send({
                "success": true,
                 "data": response.data.data.status
            })
            
    } catch (error){
        console.log(error)
    }
}



exports.payToAddProduct = async (req,res)=>{
  try{
      const user = await User.findById(req.params.userId)
  
      
       const response = await initProductPay(user.email,5000);
  
      res.status(200).send({
          checkout_link: response.data.data.authorization_url
      })
  } catch (error){
      console.log(error)
      res.status(500).json({
          success:false,
          msg:error
      })
  }
  
     
  }