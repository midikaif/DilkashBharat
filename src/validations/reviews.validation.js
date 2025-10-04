const Joi = require('joi');

const reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required(),
        body: Joi.string().required()
    })
})

module.exports = reviewSchema;