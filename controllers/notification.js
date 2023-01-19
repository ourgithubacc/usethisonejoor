const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const {sendNotification} = require('../helper/notification')

exports.sendToAll = async (req,res,next) =>{

 sendNotification('test','this is a test')
 .then(()=>{
        res.status(200).json({
            success: true,
            msg: 'Notification sent Sucessfully'
        })
    }).catch((err)=>{
        console.log(err);
        res.status(400).json({
            success: false,
            msg:'Notification went wrong'
        })
    })
};