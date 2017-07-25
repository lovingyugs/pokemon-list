const express = require('express');
const app = express();
// Run the app by serving the static files
// in the dist directory
app.use(express.static(__dirname + '/dist'));
// Start the app by listening on the default
// Heroku port
app.listen(process.env.PORT || 8080, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Magic Happens at http://localhost:8080/");
  }
});
