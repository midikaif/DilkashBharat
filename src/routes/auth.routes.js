const express= require('express');
const userModel = require('../models/user.model');
const {registerForm,loginForm, register, login} = require('../controllers/auth.controller');
const passport = require('passport');
const router = express.Router();

router.get('/register',registerForm);

router.post('/register',register);


router.get('/login',loginForm);

const middle=(req,res,next)=>{
        console.log(req.body);
        console.log("hello");
    next();
}

router.post('/login',middle,passport.authenticate('local',{failureRedirect:'/auth/login', failureFlash:true}),login)

module.exports = router;