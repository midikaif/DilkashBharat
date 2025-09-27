const placesModel = require("../models/places.model");

async function showPlaces(req, res) {
  const allPlaces = await placesModel.find({});
  res.render("places/index", { allPlaces });
}

async function singlePlace(req, res) {
  const place = await placesModel.findById(req.params.id);
  res.render("places/show", { place });
}

function newPlaceForm(req, res) {
  res.render("places/add");
}

async function addNewPlace(req,res){
    const place = await placesModel.create(req.body.place);
    res.redirect(`places/${place._id}`);
}

async function showEditPlace(req,res){
    const place = await placesModel.findById(req.params.id);
    res.render('places/edit', {place})
}

async function editPlace(req,res){
    const updatedPlace = await placesModel.findByIdAndUpdate(req.params.id,{...req.body.place});
    res.redirect(`/places/${updatedPlace._id}`);
}

async function deletePlace(req,res){
    await placesModel.findByIdAndDelete(req.params.id);
    res.redirect('/places')
}


module.exports = { showPlaces, singlePlace, newPlaceForm, addNewPlace,showEditPlace, editPlace, deletePlace };