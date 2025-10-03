const placesModel = require("../models/places.model");

async function showPlaces(req, res) {
  try {
    const allPlaces = await placesModel.find({}).limit(10);
    if (!allPlaces) {
      throw new Error("No Places found!");
    }
    res.render("places/index", { allPlaces });
  } catch (e) {
    console.log(e);
  }
}

async function singlePlace(req, res) {
  try {
    const place = await placesModel.findById(req.params.id);
    if (!place) {
      throw new Error("Couldn't find the place!");
    }
    res.render("places/show", { place });
  } catch (e) {
    console.log(e);
  }
}

function newPlaceForm(req, res) {
  res.render("places/add",{errors: null, formData:{}});
}

async function addNewPlace(req, res) {
  try {
    const place = await placesModel.create(req.body.place);
    let error;

    if (!place) {
      error = new Error("Something went wrong!");
    }

    res.redirect(`places/${place._id}`);
  } catch (e) {
    console.log(e);
  }
}

async function showEditPlace(req, res) {
  try {
    const place = await placesModel.findById(req.params.id);
    if (!place) {
      throw new Error("Something went wrong!");
    }
    res.render("places/edit", { place });
  } catch (e) {
    console.log(e);
  }
}

async function editPlace(req, res) {
  try {
    const updatedPlace = await placesModel.findByIdAndUpdate(req.params.id, {
      ...req.body.place,
    });
    if (!updatedPlace) {
        throw new Error("Couldn't update place!");
    }
    res.redirect(`/places/${updatedPlace._id}`);
  } catch (e) {
    console.log(e);
  }
}

async function deletePlace(req, res) {
  await placesModel.findByIdAndDelete(req.params.id);
  res.redirect("/places");
}

module.exports = {
  showPlaces,
  singlePlace,
  newPlaceForm,
  addNewPlace,
  showEditPlace,
  editPlace,
  deletePlace,
};
