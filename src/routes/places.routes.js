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

const validate = require('../middlewares/validate');
const {placesSchema} = require('../validations/places.validation');
const reviewSchema = require('../validations/reviews.validation')

const router = express.Router({mergeParams: true});

router.get('/',showPlaces);

router.get("/new", newPlaceForm);

router.post("/", validate(placesSchema, "places/add"), addNewPlace);

router.get('/:id', singlePlace);

router.get('/:id/edit',showEditPlace)

router.put('/:id', validate(placesSchema,'places/edit'),editPlace);

router.delete('/:id',deletePlace);

router.post('/:id/reviews', addReview);

router.delete('/:id/reviews/:reviewId', deleteReview);

module.exports = router;