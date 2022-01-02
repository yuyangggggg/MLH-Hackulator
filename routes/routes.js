
const express = require('express');
const router = express.Router();
const User = require("../models/user")  
const bcrypt = require('bcrypt');

//router.use(bodyparser.json());
//router.use(bodyparser.urlencoded({extended: true}));

//go to the login page
router.get("/login", function (request, response){
    //show this file when the "/login" is requested

    console.log("login");
    response.render("login");
});

//go to the signup page
router.get("/signup", function (request, response){
    //show this file when the "/signup" is requested

    console.log("signup");
    response.render("signup");
});

//user signs up
router.post('/signup-submit',(req,res)=>{
    const {email, typePassword, confirmPassword} = req.body;
    let errors = [];
    console.log('email :' + email + ' pass:' + confirmPassword);
    if(!email || !typePassword || !confirmPassword) {
        errors.push({msg : "Please fill in all fields"})
    }
    
    //check if match
    if(typePassword !== confirmPassword) {
        errors.push({msg : "passwords dont match"});
    }
    //check if password is more than 6 characters
    if(typePassword.length < 6 ) {
        errors.push({msg : 'password atleast 6 characters'})
    }
    if(errors.length > 0 ) {
        res.render('signup', {
            errors : errors,
            email : email,
            typePassword : typePassword,
            confirmPassword : confirmPassword})
        console.log("OI ERROR")
    } else {
    //validation passed
    User.findOne({email : email}).exec((err,user)=>{
        console.log(user)   
        if(user) {
            errors.push({msg: 'email already registered'});
            res.render('signup',{errors,email,typePassword,confirmPassword});

        } else {
            console.log("asshole")
            const newUser = new User({
                email : email,
                password : typePassword
            });

            //hash the passwords 
            bcrypt.genSalt(10,(err,salt)=> 
                bcrypt.hash(newUser.password,salt,
                    (err,hash)=> {
                        if(err) throw err;
                        //save pass to hash
                        newUser.password = hash;
                    //save user
                    newUser.save()
                    .then((value)=>{
                        console.log(value)

                        req.flash('success_msg','You have now registered!')

                        res.redirect('/login');
                    })
                    .catch(value=> console.log(value));
                }));
        }
    })
}  
})



module.exports = router; 