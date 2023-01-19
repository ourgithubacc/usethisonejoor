const nodemailer = require('nodemailer')

exports.sendEmail = async (email,body,subject) =>{
  try {
    let transporter = nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port:2525,
      auth: {
        user: '2a47fd6770a84d',
        pass: '248e23590fa3eb'
      }
    });
    
    let mailOptions = {
      from: 'BUSA',
      to: email,
      subject,
      text:body
    };
    
    transporter.sendMail(mailOptions, function(err, data) {
      if (err) {
        console.log("Error " + err);
      } else {
        console.log("Email sent successfully");
      }
    });
    
    
  } catch (error) {
    
  }
}


