const Devour = require('devour-client');
const npmPkg = require('../../package.json');

const dashboardRouter = (req, res) => {
  const jsonApi = new Devour({
    apiUrl: 'https://stakeholder-engagement-api.herokuapp.com/api/v1',
    'user-agent': `stakeholder-engagement-frontend/${npmPkg.version} (https://github.com/communitiesuk/stakeholder-engagement-frontend)`
  });
  const params = {};
  const apis = [
    {
      type: 'region',
      model : {
        id: '',
        slug: "",
        name: "",
        nuts_code: "",
        created_at: "",
        updated_at: "",
        links: {}
      }
    },
    {
      type: 'policy_area',
      model : {
        "id": '',
        "slug": '',
        "name": '',
        "created_at": '',
        "updated_at": '',
        links: {}
      }
    }
  ];

  apis.forEach(({ type, model }, index) => {
    jsonApi.define(type, model);
  });

  (async () => {
    const responses = await Promise.all(
      apis.map(({type}) => jsonApi.findAll(type))
    );

    apis.forEach(({ type }, index) => {
      params[type] = responses[index].data;
    });

    res.render('app/views/dashboard', params);

  })();

};

module.exports = dashboardRouter;
