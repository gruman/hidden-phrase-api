const express = require('express')
const app = express()
var bodyParser = require('body-parser')
const port = 8080
const cron = require('node-cron')
var nodemailer = require('nodemailer')
const suggestions = require('./constants/tasks.json')

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'matthewgruman@gmail.com',
    pass: 'ajvdqaonkxhesgsc'
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)

  cron.schedule('0 0 * * *', () => {
    const millisecondsInAnHour = 60 * 60 * 1000

    const startTime = 10 * millisecondsInAnHour
    const endTime = 22 * millisecondsInAnHour

    // Generate a random number between startTime and endTime
    const randomTime = startTime + Math.random() * (endTime - startTime)

    setTimeout(() => {
      var mailOptions = {
        from: 'matthewgruman@gmail.com',
        to: 'matthewgruman@gmail.com',
        subject: suggestions[Math.floor(Math.random() * suggestions.length)],
        text: 'Please try.'
      }

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error)
        } else {
          console.log('Email sent: ' + info.response)
        }
      })
    }, randomTime)
  })
})
