const express = require('express');
const app = express()
var bodyParser = require('body-parser')
const port = 8080
const cron = require('node-cron');
var nodemailer = require('nodemailer');
const publicController = require('./controllers/public')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'matthewgruman@gmail.com',
    pass: 'ajvdqaonkxhesgsc'
  }
});


const publicRoutes = require('./routes/public')
const usersRoutes = require('./routes/users')

app.use('/', publicRoutes)

let suggestions = [
  "Wash your face",
  "Take a shower",
  "Clean your bedroom",
  "Clean your bathroom",
  "Do the dishes",
  "Make your bed",
  "Cut your nails",
  "Wash your coffee mug",
  "Go for a walk",
  "Check your mail",
  "Sweep the floor",
  "Tidy your living room",
  "Make something out of wood",
  "Play guitar",
  "Play piano",
  "Take out garbage",
  "Take out compost",
  "Do the laundry",
  "Breathe for a minute"
]
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)

  cron.schedule('0 0 * * *', () => {
  const randomHour = Math.floor(Math.random() * 13) + 10; // Random hour between 10 and 22 (10 AM - 10 PM)
  const randomMinute = Math.floor(Math.random() * 60); // Random minute between 0 and 59

  const cronExpression = `${randomMinute} ${randomHour} * * *`;

  cron.schedule(cronExpression, () => {
    var mailOptions = {
      from: 'matthewgruman@gmail.com',
      to: 'matthewgruman@gmail.com',
      subject: suggestions[Math.floor(Math.random() * suggestions.length)],
      text: 'Please try.'
    }

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  })
})
})




