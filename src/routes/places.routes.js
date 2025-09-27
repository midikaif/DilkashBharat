const express = require('express');
const {showPlaces, singlePlace, newPlaceForm, addNewPlace, editPlace, showEditPlace, deletePlace} = require('../controllers/places.controller');

const router = express.Router();

router.get('/places',showPlaces);

router.get("/places/new", newPlaceForm);

router.post('/places', addNewPlace);

router.get('/places/:id', singlePlace);

router.get('/places/:id/edit',showEditPlace)

router.put('/places/:id', editPlace);

router.delete('/places/:id',deletePlace);


module.exports = router;