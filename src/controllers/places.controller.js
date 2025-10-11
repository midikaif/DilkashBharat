const placesModel = require("../models/places.model");
const reviewsModel = require("../models/reviews.model");

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
    const place = await placesModel.findById(req.params.id).populate('reviews').populate('author');
    console.log(place);
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
    if (!place) {
      req.flash('error','Couldn\'t add a new place!');
      return res.redirect('places');
    }
    req.flash('success','Successfully added a new place!');
    res.redirect(`places/${place._id}`);
  } catch (e) {
    console.log(e);
  }
}

async function showEditPlace(req, res) {
  try {
    const place = await placesModel.findById(req.params.id);
    if (!place) {
      req.flash("error", "Can't edit this place!");
      return res.redirect('places');
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
      req.flash('error',"Can't update the place!")
      return res.redirect('places');
    }
    req.flash("success", "Successfully edited the place!");
    res.redirect(`/places/${updatedPlace._id}`);
  } catch (e) {
    console.log(e);
  }
}

async function deletePlace(req, res) {
  await placesModel.findByIdAndDelete(req.params.id);
  req.flash('success', "Successfully deleted the place!")
  res.redirect("/places");
}

async function addReview(req,res){
  const {id} = req.params;
  const place = await placesModel.findById(id);
  const review = await reviewsModel.create(req.body.review);
  place.reviews.push(review);
  place.save();
  req.flash('success', 'Successfully added the review!')
  res.redirect(`/places/${id}`);
}

async function deleteReview(req,res){
  const {id, reviewId} = req.params;
  await reviewsModel.findByIdAndDelete(reviewId);
  req.flash('success','Successfully deleted the review!');
  res.redirect(`/places/${id}`);
}

module.exports = {
  showPlaces,
  singlePlace,
  newPlaceForm,
  addNewPlace,
  showEditPlace,
  editPlace,
  deletePlace,
  addReview,
  deleteReview
};
