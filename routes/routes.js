const express = require('express');
const router = express.Router();

router.get("/login", function (request, response){
    //show this file when the "/" is requested

    console.log("login bitch");
    response.render("login.html");
  });

router.get("/signup", function (request, response){
    //show this file when the "/" is requested

    console.log("login bitch");
    response.render("signup.html");
  });

module.exports = router;
