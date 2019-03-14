const Joi = require('joi');
const validateFields = (body, schema) => {
  const schemas = {
    summary: Joi.object()
      .keys({
        full_name: Joi.string().required(),
        'date_contact-day': Joi.number()
          .integer()
          .min(1)
          .max(31),
        'date_contact-month': Joi.number()
          .integer()
          .min(1)
          .max(12),
        'date_contact-year': Joi.number()
          .integer()
          .min(2019)
          .max(2029),
        successful_contact: Joi.string(),
        anonymous: Joi.string()
      })
      .with('date_contact-day', ['date_contact-month', 'date_contact-year'])
  };
  // validate all fields, return boolean
  return Joi.validate(body, schemas[schema], (err, value) => err ? false : true);
};

module.exports = validateFields;
