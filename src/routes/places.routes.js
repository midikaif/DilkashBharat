const express = require("express");
const multer = require("multer");
const { storage } = require("../services/cloudinary");
const upload = multer({ storage });

const {
  showPlaces,
  singlePlace,
  newPlaceForm,
  addNewPlace,
  editPlace,
  showEditPlace,
  deletePlace,
} = require("../controllers/places.controller");

const {
  addReview,
  deleteReview,
  redirectToReviews,
} = require("../controllers/reviews.controller");

const validate = require("../middlewares/validate.middleware");
const { placesSchema } = require("../validations/places.validation");
const reviewSchema = require("../validations/reviews.validation");
const {
  isLoggedIn,
  isAuthor,
  isReviewAuthor,
} = require("../middlewares/auth.middleware");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(showPlaces)
  .post(
    isLoggedIn,
    validate(placesSchema, "places/add"),
    upload.array("image", 3),
    addNewPlace
  );

router.get("/new", isLoggedIn, newPlaceForm);

router
  .route("/:id")
  .get(singlePlace)
  .put(isLoggedIn, isAuthor, upload.array("image", 3), editPlace)
  .delete(isLoggedIn, isAuthor, deletePlace);

router.get("/:id/edit", isLoggedIn, isAuthor, showEditPlace);

router
  .route("/:id/reviews")
  .get(redirectToReviews)
  .post(isLoggedIn, addReview);

router.delete(
  "/:id/reviews/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  deleteReview
);

module.exports = router;
