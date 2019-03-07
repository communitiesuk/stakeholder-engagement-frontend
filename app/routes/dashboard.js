const Devour = require('devour-client');
const npmPkg = require('../../package.json');

const dashboardRouter = (req, res) => {
  const params = {};
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

  (async () => {
    const responses = await Promise.all([
      jsonApi.findAll('region')
    ]);

    params.data = responses.map((response) => {
      return { data, errors, meta, links } = response;
    })

    res.render('app/views/dashboard', params);

  })();

};

module.exports = dashboardRouter;
