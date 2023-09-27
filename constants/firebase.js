var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

module.exports = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://playground-43be4-default-rtdb.firebaseio.com"
});
