const placesModel = require("../models/places.model");

async function showPlaces(req, res) {
  const allPlaces = await placesModel.find({});
  res.render("places/index", { allPlaces });
}

async function singlePlace(req, res) {
  const place = await placesModel.findById(req.params.id);
  res.render("places/showPlace", { place });
}

function newPlaceForm(req, res) {
  res.render("places/addPlace");
}

async function addNewPlace(req,res){
    const place = await placesModel.create(req.body.places);
    res.redirect(`places/${place._id}`);
}


module.exports = { showPlaces, singlePlace, newPlaceForm, addNewPlace };