const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
    service: 'gmail', // Use your preferred email service
    auth: {
        user: 'your-email@gmail.com',
        pass: 'your-email-password'  // Use an app-specific password if using Gmail with 2-step verification
    }
});

app.post('/submitOrder', (req, res) => {
    const { email, orderSummary } = req.body;

    const clientMailOptions = {
        from: 'your-email@gmail.com',
        to: 'client-email@example.com', // Replace with the client's email
        subject: 'New Order Submission',
        text: orderSummary
    };

    const userMailOptions = {
        from: 'your-email@gmail.com',
        to: email,  // User's email
        subject: 'Order Confirmation',
        text: `Thank you for your order!\n\n${orderSummary}`
    };

    transporter.sendMail(clientMailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
    });

    transporter.sendMail(userMailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
    });

    res.json({ success: true });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
