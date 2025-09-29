const express = require('express');
const {showPlaces, singlePlace, newPlaceForm, addNewPlace, editPlace, showEditPlace, deletePlace} = require('../controllers/places.controller');

const router = express.Router();

router.get('/',showPlaces);

router.get("/new", newPlaceForm);

router.post('/', addNewPlace);

router.get('/:id', singlePlace);

router.get('/:id/edit',showEditPlace)

router.put('/:id', editPlace);

router.delete('/:id',deletePlace);


module.exports = router;