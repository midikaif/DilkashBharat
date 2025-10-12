const placesModel = require("../models/places.model");
const reviewsModel = require("../models/reviews.model");

module.exports.redirectToReviews = function (req,res){
    const {id} = req.params;

    // The only logic here is to redirect with the fragment identifier for scrolling
    res.redirect(302, `/places/${id}#reviews`);
}

module.exports.addReview = async function (req, res) {
  const { id } = req.params;
  const place = await placesModel.findById(id);
  const review = await reviewsModel.create({...req.body.review, author: req.user._id});
  place.reviews.push(review);
  place.save();
  req.flash("success", "Successfully added the review!");
  res.redirect(`/places/${id}`);
};

module.exports.deleteReview = async function (req, res) {
  const { id, reviewId } = req.params;
  await reviewsModel.findByIdAndDelete(reviewId);
  req.flash("success", "Successfully deleted the review!");
  res.redirect(`/places/${id}`);
}
