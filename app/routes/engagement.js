const validateFields = require('../lib/validateFields');

const engagementRouter = (req, res) => {
  const {
    body,
    params: { step }
  } = req;
  const params = {};
  let template = 'app/views/engagement/index';

  // validation schemas for Joy

  if (step) {
    // assume this isn't the first page
    template = `app/views/engagement/${step}`;

    const valid = validateFields(body, step);
    // TODO: call API for extra data
  };

  res.render(template, params);
};

module.exports = engagementRouter;
