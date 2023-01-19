const {sendEmail} = require('../helper/sendEmail')


exports.sendFeedBack = async (req,res) =>{
    try {
        const {feedback} = req.body
        console.log(feedback)
        
        const email = 'busa@gmail.com'
        const body = `Message: ${feedback}`
    sendEmail(email,body,"FeedBack")

    res.status(200).json({
        success: true,
        message: "Email sent successfully"
    })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message:'Internal Error Occured'
        })
    }
}