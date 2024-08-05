const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'Anisgharsellaoui027@gmail.com',
    pass: 'lzzi rjmh rqik hhsv'
  }
});

const sendResetEmail = (email, token) => {
  const resetLink = `http://localhost:3000/reset-password/${token}/${email}`;
  const mailOptions = {
    from: 'your-email@gmail.com',
    to: email,
    subject: 'Password Reset',
    text: `You requested a password reset. Please click on this link to reset your password: ${resetLink}`
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

module.exports = sendResetEmail;
