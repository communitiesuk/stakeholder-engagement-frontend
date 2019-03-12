const Joi = require('joi');

const engagementRouter = (req, res) => {
  const { body } = req;
  const { step } = req.params;
  const template = (step != undefined) ? `app/views/engagement/${step}` : 'app/views/engagement/index';
  const params = {};

  const schema = Joi.object().keys({
    'full_name': Joi.string().required(),
    'date_contact-day': Joi.number().integer().min(1).max(31),
    'date_contact-month': Joi.number().integer().min(1).max(12),
    'date_contact-year': Joi.number().integer().min(2019).max(2029),
    'successful_contact': Joi.string(),
    'anonymous': Joi.string()
  }).with('date_contact-day', ['date_contact-month', 'date_contact-year']);

  Joi.validate(body, schema, (err, value) => {

    if (err) {
			console.log('engagementRouter -> err', err.details)
    } else {
      params.data = value;
    }

    res.render(template, params);

  });
};

module.exports = engagementRouter;
