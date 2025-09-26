const express = require('express');
const {showPlaces, singlePlace, newPlaceForm, addNewPlace} = require('../controllers/places.controller');

const router = express.Router();

router.get('/places',showPlaces);

router.get("/places/new", newPlaceForm);

router.post('/places', addNewPlace)

router.get('/places/:id', singlePlace);




module.exports = router;