const userModel = require("../models/user.model");


function registerForm(req,res){
    res.render('users/register');
}

async function register(req,res){
    try{
        const {email, username, password} = req.body;
        const user = new userModel({email,username});
        const registeredUser = await userModel.register(user,password);
        res.login(registeredUser, err => {
            if(err) return next(err);
            req.flash('success','Welcome to Dilkash!');
            res.redirect('/places');
        })
    }catch(e){
        req.flash('error',e.message);
        res.redirect('register');
    }
}

function loginForm(req,res){
    res.render('users/login');
}

function login(req,res){
    req.flash('success','Welcome back!');
    const redirectUrl = res.locals.returnTo || '/places';
    res.redirect(redirectUrl);
}


module.exports = {registerForm,loginForm,register,login}