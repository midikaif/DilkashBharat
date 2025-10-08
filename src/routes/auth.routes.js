const express= require('express');
const userModel = require('../models/user.model');
const {registerForm,loginForm} = require('../controllers/auth.controller');
const router = express.Router();

router.get('/register',registerForm);
router.get('/login',loginForm);

module.exports = router;