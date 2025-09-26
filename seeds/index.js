require('dotenv').config();
const mongoose = require("mongoose");
const cities = require("./cities");
const titles = require("./titles");
const Places = require("../src/models/places.model");
const connectDB = require("../src/db/db");

connectDB();

const seedDB = async () => {
  await Places.deleteMany({});
  for (let i = 0; i < 100; i++) {
    const random = Math.floor(Math.random() * 162);
    const place = await Places.create({
        title: titles[random],
        location: `${cities[random].city}, ${cities[random].state}`,
    });
}
};

seedDB().then(()=>{
    mongoose.connection.close();
})