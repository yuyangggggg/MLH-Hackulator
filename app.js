var express = require("express");
const path = require('path')
const route = require('./routes/routes.js');


//use the application off of express.
var app = express();

app.use('/', route);

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.engine('html', require('ejs').renderFile);
app.use(express.static(path.join(__dirname, 'views')));

//define the route for "/"
app.get("/", function (request, response){
    //show this file when the "/" is requested
    response.render("main.html");
  });
 
  //start the server
  app.listen(8080);

console.log("http://localhost:8080");
