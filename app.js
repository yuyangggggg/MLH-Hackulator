var express = require("express");
const path = require('path')
const route = require('./routes/routes.js');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const expressEjsLayout = require('express-ejs-layouts')
const flash = require('connect-flash');
const session = require('express-session');


//use the application off of express.
var app = express();

mongoose.connect('mongodb://localhost:27017',{useNewUrlParser: true, useUnifiedTopology : true})
.then(() => console.log('connected,,'))
.catch((err)=> console.log(err));

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.engine('html', require('ejs').renderFile);

//app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));

///flash messages
app.use(session({
   secret : 'secret',
   resave : true,
   saveUninitialized : true
}));

//use flash
app.use(flash());
app.use((req,res,next)=> {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error  = req.flash('error');
  next();
})

app.use('/', route);

//app.use(express.static(path.join(__dirname, 'public')));
app.use('/public', express.static('public'));


//define the route for "/"
app.get("/", function (request, response){
    //show this file when the "/" is requested
    response.render("main");
});

  //start the server
  app.listen(8080);

  console.log("http://localhost:8080");
