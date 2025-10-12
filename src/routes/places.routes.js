const express = require('express');
const {
  showPlaces,
  singlePlace,
  newPlaceForm,
  addNewPlace,
  editPlace,
  showEditPlace,
  deletePlace,
} = require("../controllers/places.controller");

const {addReview,deleteReview, redirectToReviews} = require('../controllers/reviews.controller');

const validate = require('../middlewares/validate.middleware');
const {placesSchema} = require('../validations/places.validation');
const reviewSchema = require('../validations/reviews.validation');
const {isLoggedIn, isAuthor, isReviewAuthor} = require('../middlewares/auth.middleware');

const router = express.Router({mergeParams: true});

router.get('/',showPlaces);

router.get("/new",isLoggedIn, newPlaceForm);

router.post("/",isLoggedIn, validate(placesSchema, "places/add"), addNewPlace);

router.get('/:id', singlePlace);

router.get('/:id/edit', isLoggedIn, isAuthor, showEditPlace);

router.put('/:id', isLoggedIn, isAuthor, validate(placesSchema,'places/edit'), editPlace);

router.delete('/:id',isLoggedIn, isAuthor, deletePlace);

router.get('/:id/reviews', redirectToReviews);

router.post('/:id/reviews',isLoggedIn, addReview);

router.delete('/:id/reviews/:reviewId', isLoggedIn, isReviewAuthor, deleteReview);

module.exports = router;