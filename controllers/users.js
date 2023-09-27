exports.updateUser = (req, res) => {
  console.log(req.body)
  db.ref('users/' + req.body.uid).update({
    email: req.body.email,
    time: req.body.time,
    createdAt: Date.now()
  })
}