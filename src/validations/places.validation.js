const Joi = require('joi');
const sanitizeHtml = require('sanitize-html');

const extension = (joi) => ({
  type: 'string',
  base: joi.string(),
  messages: {
    'string.escapeHTML': '{{#label}} must not include HTML!'
  },
  rules: {
    escapeHTML: {
      validate(value,helpers){
        const clean = sanitizeHtml(value, {
          allowedTags: [],
          allowedAttributes: {},
        });
        if(clean !== value) return helpers.error('string.escapeHTML', {value});
        return clean;
      }
    }
  }
})

const placesSchema = Joi.object({
  place: Joi.object({
    title: Joi.string().min(3).max(100).required(),
    location: Joi.string().min(2).max(100).required(),
  }).required(),
});

module.exports = {placesSchema}