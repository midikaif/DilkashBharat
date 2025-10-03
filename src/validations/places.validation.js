const Joi = require('joi');

const placesSchema = Joi.object({
  place: Joi.object({
    title: Joi.string().min(3).max(100).required(),
    location: Joi.string().min(2).max(100).required(),
  }).required(),
});

module.exports = {placesSchema}