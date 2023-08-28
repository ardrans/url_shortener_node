const nodemailer = require('nodemailer');

// Create a transporter using SMTP transport
const transporter = nodemailer.createTransport({
    service: 'Gmail', // Use your email service provider
    auth: {
        user: 'your@gmail.com', // Your email address
        pass: 'your-password-or-application-specific-password' // Your password or application-specific password
    }
});

// Function to send an email
function sendEmail(subject, text, to) {
    const mailOptions = {
        from: 'your@gmail.com',
        to: to,
        subject: subject,
        text: text
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
}

module.exports = sendEmail
