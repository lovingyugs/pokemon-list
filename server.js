const express = require('express');
const app = express();
const morgan = require('morgan');
const router = express.Router();
// Run the app by serving the static files
// in the dist directory
app.use(express.static(__dirname + '/dist'));
// Start the app by listening on the default
// Heroku port
app.use(morgan('dev'));

app.listen(process.env.PORT || 8000, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Magic Happens at http://localhost:8000/");
  }
});

app.use('/',router);
app.get('*',function(req,res){
  res.redirect('/');
})
