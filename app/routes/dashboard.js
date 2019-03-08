const Devour = require('devour-client');
const npmPkg = require('../../package.json');

const dashboardRouter = (req, res) => {
  const jsonApi = new Devour({
    apiUrl: 'https://stakeholder-engagement-api.herokuapp.com/api/v1',
    'user-agent': `stakeholder-engagement-frontend/${npmPkg.version} (https://github.com/communitiesuk/stakeholder-engagement-frontend)`
  });

  // model
  jsonApi.define('region', {
    id: '',
    slug: "",
    name: "",
    nuts_code: "",
    created_at: "",
    updated_at: "",
    links : {}
  });

  const params = {};
  const apis = ['region'];
  (async () => {
    const responses = await Promise.all(apis.map((api) => jsonApi.findAll(api)));

    apis.forEach((api, index) => {
      params[api] = responses[index].data;
    });

    res.render('app/views/dashboard', params);

  })();

};

module.exports = dashboardRouter;
