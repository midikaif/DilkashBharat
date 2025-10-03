const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');

const places = require('./routes/places.routes');

const app = express();

app.engine('ejs',ejsMate);
app.use(express.json());

app.set("view engine", "ejs");
app.set('views',path.join(__dirname,'views'));

app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));



app.use("/places", places);


module.exports = app;