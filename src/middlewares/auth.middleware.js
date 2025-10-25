const placesModel = require("../models/places.model");
const reviewsModel = require("../models/reviews.model");

module.exports.isLoggedIn = (req,res,next) =>{
    if(!req.isAuthenticated()){
        req.session.returnTo = req.originalUrl;
        console.log('in logged in middleware');
        req.flash('error','You must be signed in first!');
        return res.redirect('/auth/login');
    }
    next(); 
}

module.exports.storeReturnTo = (req,res,next) =>{
    if(req.session.returnTo){
        res.locals.returnTo = req.session.returnTo;
    }
    next();
}

module.exports.isAuthor = async (req,res,next) => {
      const { id } = req.params;
      const place = await placesModel.findById(id);
      if (!place.author.equals(req.user._id)) {
        req.flash("error", "You do not have permission to do that!");
        return res.redirect(`/places/${id}`);
      }
    next();
}

module.exports.isReviewAuthor = async (req,res,next) => {
      const { id, reviewId } = req.params;
      const review = await reviewsModel.findById(reviewId);
      if (!review.author.equals(req.user._id)) {
        req.flash("error", "You do not have permission to do that!");
        return res.redirect(`/places/${id}`);
      }
    next();
}