const express= require('express');
const userModel = require('../models/user.model');
const {registerForm,loginForm, register, login} = require('../controllers/auth.controller');
const passport = require('passport');
const router = express.Router();

router.get('/register',registerForm);

router.post('/register',register);


router.get('/login',loginForm);

router.post('/login',passport.authenticate('local',{failureRedirect:'/auth/login', failureFlash:true}),login)

router.get('/logout',(req,res,next)=>{
    req.logout(function (err){
        if(err){
            return next(err);
        }
        req.flash('success','Goodbye!');
        res.redirect('/places');
    })
})


module.exports = router;