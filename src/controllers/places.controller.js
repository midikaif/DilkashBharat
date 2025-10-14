const placesModel = require("../models/places.model");
const reviewsModel = require("../models/reviews.model");

async function showPlaces(req, res) {
  try {
    const allPlaces = await placesModel.find({});
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
    const place = await placesModel
      .findById(req.params.id)
      .populate({
        path: "reviews",
        populate: {
          path: "author",
        },
      })
      .populate("author");
    if (!place) {
      throw new Error("Couldn't find the place!");
    }
    res.render("places/show", { place });
  } catch (e) {
    console.log(e);
  }
}

function newPlaceForm(req, res) {
  res.render("places/add", { errors: null, formData: {} });
}

async function addNewPlace(req, res) {
  try {
    
    const images = req.files.map((file) => ({
      url: file.path,
      filename: file.filename,
    }));

    const place = await placesModel.create({
      ...req.body.place,
      author: req.user._id,
      images
    });
    
    if (!place) {
      req.flash("error", "Couldn't add a new place!");
      return res.redirect("places");
    }

    req.flash("success", "Successfully added a new place!");
    res.redirect(`places/${place._id}`);
  } catch (e) {
    console.log(e);
  }
}

async function showEditPlace(req, res) {
  try {
    const { id } = req.params;
    const place = await placesModel.findById(id);
    if (!place) {
      req.flash("error", "Can't find this place!");
      return res.redirect("places");
    }
    res.render("places/edit", { place });
  } catch (e) {
    console.log(e);
  }
}

async function editPlace(req, res) {
  try {
    const { id } = req.params;
    
    const updatedPlace = await placesModel.findByIdAndUpdate(id, {
      ...req.body.place,  
    });

    const images = req.files.map((file) => ({
      url: file.path,
      filename: file.filename,
    }));

    updatedPlace.images.push(...images);
    await updatedPlace.save();

    if (!updatedPlace) {
      req.flash("error", "Can't update the place!");
      return res.redirect("places");
    }
    req.flash("success", "Successfully edited the place!");
    res.redirect(`/places/${updatedPlace._id}`);
  } catch (e) {
    console.log(e);
  }
}

async function deletePlace(req, res) {
  await placesModel.findByIdAndDelete(req.params.id);
  req.flash("success", "Successfully deleted the place!");
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
