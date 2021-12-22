const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
   let transporter = nodemailer.createTransport({
      host: process.env.HOST,
      auth: {
         user: process.env.USER,
         pass: process.env.PASS,
      },
   });
   const message = {
      from: `${process.env.FROM_NAME} <${process.env.USER}>`, // sender address
      to: options.email, // list of receivers
      subject: options.subject, //   Subject line
      text: options.message, // plain text body
   };
   const info = await transporter.sendMail(message);
   console.log("message sent: %s", info.messageId);
   // transporter.sendMail(message, function (err, info) {
   //    if (err) console.log(err);
   //    else console.log(info);
   // });
};

// https://www.youtube.com/watch?v=oiSixXJsXac&t=787s

module.exports = sendEmail;
