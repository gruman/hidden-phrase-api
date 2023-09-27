
const cron = require('node-cron');
//const admin = require('../constants/firebase');
//var db = admin.database();
let suggestions = [
  "Wash your face",
  "Take a shower",
  "Clean your bedroom",
  "Clean your bathroom",
  "Do the dishes",
  "Make your bed",
  "Take a shower",
  "Cut your nails",
  "Wash your coffee mug",
  "Go for a walk",
  "Check your mail",
  "Sweep the floor",
  "The your living room",
  "Make something out of wood",
  "Play guitar",
  "Play piano"
]

// exports.addSuggestions = (req, res, next) => {
//   console.log(req.body)
//   db.ref('users/' + req.body.uid).update({
//     email: req.body.email,
//     suggestions: req.body.suggestions,
//     timeStart: req.body.timeStart,
//     timeEnd: req.body.timeEnd,
//     updated: Date.now()
//   })
// }

exports.setupApp = (req, res, next) => {
  cron.schedule('42 22 * * *', () => {
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
}