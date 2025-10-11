const express = require('express');
const {
  showPlaces,
  singlePlace,
  newPlaceForm,
  addNewPlace,
  editPlace,
  showEditPlace,
  deletePlace,
  addReview,
  deleteReview
} = require("../controllers/places.controller");

const validate = require('../middlewares/validate.middleware');
const {placesSchema} = require('../validations/places.validation');
const reviewSchema = require('../validations/reviews.validation');
const {isLoggedIn} = require('../middlewares/auth.middleware');

const router = express.Router({mergeParams: true});

router.get('/',showPlaces);

router.get("/new",isLoggedIn, newPlaceForm);

router.post("/",isLoggedIn, validate(placesSchema, "places/add"), addNewPlace);

router.get('/:id', singlePlace);

router.get('/:id/edit', isLoggedIn, showEditPlace)

router.put('/:id', isLoggedIn, validate(placesSchema,'places/edit'), editPlace);

router.delete('/:id',isLoggedIn, deletePlace);

router.post('/:id/reviews',isLoggedIn, addReview);

router.delete('/:id/reviews/:reviewId', isLoggedIn, deleteReview);

module.exports = router;