const Devour = require('devour-client');
const npmPkg = require('../../package.json');
const models = require('../lib/apis.json');

const dashboardRouter = (req, res) => {
  const template = 'app/views/dashboard';
  const params = {};
  const jsonApi = new Devour({
    apiUrl: 'https://stakeholder-engagement-api.herokuapp.com/api/v1',
    'user-agent': `stakeholder-engagement-frontend/${
      npmPkg.version
    } (https://github.com/communitiesuk/stakeholder-engagement-frontend)`
  });

  const apis = ['region', 'policy_area'];
  const promises = apis.map(type => jsonApi.findAll(type));

  (async () => {
    apis.map(type => jsonApi.define(type, models[type]));

    const responses = await Promise.all(promises);

    apis.forEach((type, index) => {
      params[type] = responses[index].data;
    });

    res.render(template, params);
  })();
};

module.exports = dashboardRouter;
