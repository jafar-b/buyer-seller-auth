import nodemailer from 'nodemailer';

const sendEmail = async (options) => {
  // Create a test account for development
  const testAccount = await nodemailer.createTestAccount();

  // Create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.ethereal.email',
    port: process.env.EMAIL_PORT || 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USERNAME || testAccount.user, // generated ethereal user
      pass: process.env.EMAIL_PASSWORD || testAccount.pass, // generated ethereal password
    },
  });

  // Send mail with defined transport object
  const info = await transporter.sendMail({
    from: `"${process.env.EMAIL_FROM_NAME || 'Auth System'}" <${process.env.EMAIL_FROM || 'noreply@authsystem.com'}>`,
    to: options.to, // list of receivers
    subject: options.subject, // Subject line
    text: options.text, // plain text body
    html: options.html, // html body
  });

  // Preview only available when sending through an Ethereal account
  console.log('Message sent: %s', info.messageId);
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

  return info;
};

export default sendEmail;
