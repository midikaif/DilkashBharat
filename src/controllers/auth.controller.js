const userModel = require("../models/user.model");


function registerForm(req,res){
    res.render('users/register');
}

async function register(req,res){
    try{
        const {email, username, password} = req.body;
        console.log(req.body);
        const user = new userModel({email,username});
        const registeredUser = await userModel.register(user,password);
        req.flash('success','Welcome to Dilkash!');
        res.redirect('/places');
    }catch(e){
        req.flash('error',e.message);
        res.redirect('register');
    }
}

function loginForm(req,res){
    res.render('users/login');
}

function login(req,res){
    console.log('yaay')
    req.flash('success','Welcome back!');
    res.redirect('/places');
}


module.exports = {registerForm,loginForm,register,login}