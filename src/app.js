const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const session = require('express-session');

const places = require('./routes/places.routes');

const app = express();

app.engine('ejs',ejsMate);
app.use(express.json());

app.set("view engine", "ejs");
app.set('views',path.join(__dirname,'views'));

app.use(express.static(path.join(__dirname, '../public')))
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie:{
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24* 7,
        maxAge: 1000*60*60*24*7
    }

}))


app.use("/places", places);


module.exports = app;