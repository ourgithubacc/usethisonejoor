const qr = require('qrcode')
const Token = require('../models/token')
const moment = require('moment');
const Ticket = require('../models/tickets')
const {sendEmail} = require('../helper/sendEmail')
const User = require('../models/user')
const Event = require('../models/event')


exports.getAllTickets = async(req,res) =>{
  try {
    const tickets = await Ticket.find({})

    res.status(200).json({
      success: true,
      count: tickets.length,
      data: tickets
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      msg: "Internal Error Occured"
    })
    
  }
}

exports.getTicketByToken = async (req,res) =>{
  const {tokenn} = req.body
  const token = Token.findOne({token:tokenn})
  if(!token){
    res.status(400).json({
      success: false,
      message: "Invalid token"
    })
  } 
 

    if(token.expiryDate < new Date()){
      res.status(400).json({
        message:"Token expired. Please enter email again."
      })
    }

    const ticket = await Ticket.findOne({email:token.email})
    res.status(200).json({
      success:true,
      data: ticket
    })
}

exports.verifyPassWordForTicket = async (req,res,next) =>{
  try {
    const {email, password} = req.body
  await User.findOne({email}, (err, user) => {
    if(err || !user) {
      return res.status(400).json({
        error: "Email does not exists"
      })
    }

    if(!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and password does not match"
      })
    }
  })

  next()

  } catch (error) {
    console.log(error)
  }
}

exports.mailTempToken = async (req,res) =>{
  try{
    const {email} = req.body
    const token = await new Token({
      token: ((Math.random() + 1).toString(36).substring(7)).toUpperCase(),
      isUsed: false,
      email,
      expiryDate: moment(new Date()).add(30, 'm').toDate()
    }).save();

    const body = `This is your token: ${token.token}. Use within the next 30 minutes`
    
    await sendEmail(token.email,body,"Token")
    

  res.status(200).json({
    success: true,
    message: "Mail was sent"
  })
  } catch(error){
    console.log(error)
    res.status(500).json({
      success: false,
      message:'Internal Error Occured'
    })
  }
}

exports.scan = async(req,res, next) =>{
  try {
    const {token, eventTitle} = req.body


    const event = Event.findOne({title:eventTitle},(err,eventTitle)=>{
      if(err || !eventTitle){
        res.status(400).json({
          success: false,
          message: "Wrong Event Title"
        })
      }
    })


    let check = await Ticket.findOne({
      token: token
    })


    if(!check && !check.event.title === eventTitle){
      res.status(400).json({
        success: false
      })
    } else if(check && check.event.title === eventTitle){
      res.status(200).json({
        success: true
      })

      await Ticket.findByIdAndDelete(check._id)

      await Token.findOneAndDelete(token)
    }

  // let check = await Token.findOne({
  //   token: token,
  // });
  // console.log(check);
  // if(!check){
  //   res.status(400).json({
  //     message: "Token not found in the Database"
  //   })
  // }

  // if(check.expiryDate < new Date()){
  //   res.status(400).json({
  //     message:"Token expired."
  //   })
  // }
  // await Token.findByIdAndRemove(check._id);

  } catch (error) {
    console.log(error)
  }
}
exports.getTicketById = async (req,res) =>{
  try{
    const ticket = await Ticket.findById(req.params.ticketId)

    res.status(200).json({
      success: true,
      data: ticket
    })
  } catch(error){
    console.log(error)
    res.status(500).json({
      success: false,
      msg: "Internal Error Occured"
    })
  }
}
exports.deleteTicketById = async (req,res) =>{
  try{
    const ticket = await Ticket.findByIdAndDelete(req.params.ticketId)

    res.status(200).json({
      success: true,
      data: ticket
    })
  } catch(error){
    console.log(error)
    res.status(500).json({
      success: false,
      msg: "Internal Error Occured"
    })
  }
}


exports.checkTicket = async (req,res) =>{
  try{

  
  const token = req.body
  let check = await Token.findOne({
    token: token,
  });
  console.log(check);
  if(!check){
    res.status(400).json({
      message: "Token not found in the Database"
    })
  }

  if(check.expiryDate < new Date()){
    res.status(400).json({
      message:"Token expired."
    })
  }
  await Token.findByIdAndRemove(check._id);


  //  res.status(200).send({
  //   message: "Token verified successfully"
  // });

  
} catch (error) {
  console.log(error)
}
}





// exports.getAllTickets = async (req,res) =>{

// }







//  exports.sendEventTicket = async (req,res)=>{
//     try{
//         const user = await User.findById(req.params.userId)
        
//             sendTicket(user.email,"BUSA Show Ticket","Your Ticket","BUSA","ezehdavidhoddy@gmail.com")


//     res.status(200).json({
//         success: true  
//      })
    
// } catch (error){
//     console.log(error)
//     res.status(500).json({
//         success:false,
//         msg:error
//     })
// }







