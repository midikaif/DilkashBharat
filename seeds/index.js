require('dotenv').config();
const mongoose = require("mongoose");
const cities = require("./cities");
const titles = require("./titles");
const Places = require("../src/models/places.model");
const connectDB = require("../src/db/db");

connectDB();

const seedDB = async () => {
  await Places.deleteMany({});
  for (let i = 0; i < 30; i++) {
    const random = Math.floor(Math.random() * 162);
    const place = await Places.create({
      title: titles[random],
      author: "68e74a5c35892b26c6adfa36",
      location: `${cities[random].city}, ${cities[random].state}`,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random].lng,
          cities[random].lat,
        ],
      },
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut laborum totam accusamus velit praesentium, quaerat, consectetur voluptatum exercitationem facilis sapiente iure ea itaque quasi? Enim ratione quibusdam cupiditate dolores nostrum",
    });
}
};

seedDB().then(()=>{
    mongoose.connection.close();
})