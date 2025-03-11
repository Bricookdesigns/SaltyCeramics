// Importing required modules
const express = require('express');
const nodemailer = require('nodemailer');
const app = express();

// To parse incoming request bodies as JSON
app.use(express.json());

// Email setup using Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail', // You can use a different email service like SendGrid or Brevo
  auth: {
    user: 'your-email@gmail.com', // Replace with your email
    pass: 'your-email-password' // Replace with your email password (or use an app password)
  }
});

// POST route to send the email
app.post('/send-email', (req, res) => {
  const { name, email, phone, orderDetails } = req.body;

  // Prepare email content for customer
  const mailOptions = {
    from: 'your-email@gmail.com', // Replace with your email
    to: email, // Send a copy to the customer
    subject: 'Your Order Confirmation',
    text: `Thank you for your order, ${name}!\n\nHere are your order details:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nOrder Details: ${orderDetails}\n\nBest regards, Salty Ceramics.`
  };

  // Prepare email content for client
  const clientMailOptions = {
    from: 'your-email@gmail.com', // Replace with your email
    to: 'client-email@example.com', // Replace with the client's email address
    subject: 'New Order Received',
    text: `You have received a new order from ${name}.\n\nOrder Details:\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nOrder Details: ${orderDetails}`
  };

  // Send email to customer
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Error sending email to customer');
    } else {
      // Send email to client
      transporter.sendMail(clientMailOptions, (err, info) => {
        if (err) {
          console.log(err);
          return res.status(500).send('Error sending email to client');
        }
        res.status(200).send('Order confirmation sent to customer and client');
      });
    }
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
