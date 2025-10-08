

function registerForm(req,res){
    res.render('users/register');
}

function loginForm(req,res){
    res.render('users/login');
}

module.exports = {registerForm,loginForm}