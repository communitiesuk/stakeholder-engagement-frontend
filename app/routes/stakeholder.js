const Devour = require('devour-client');
const npmPkg = require('../../package.json');
const models = require('../lib/apis.json');

const stakeholderRouter = (req, res) => {
  const template = 'app/views/stakeholder';
  const {
    query,
    params: { stakeholder }
  } = req;
  params = {
    query,
    stakeholder
  };

  const jsonApi = new Devour({
    apiUrl: 'https://stakeholder-engagement-api.herokuapp.com/api/v1',
    'user-agent': `stakeholder-engagement-frontend/${
      npmPkg.version
    } (https://github.com/communitiesuk/stakeholder-engagement-frontend)`,
    pluralize: false
  });

  const apis = ['people', 'role'];
  const promises = [
    jsonApi.findAll('people', { filter: { slug: stakeholder } })
  ];

  (async () => {
    apis.map(type => jsonApi.define(type, models[type]));

    const responses = await Promise.all(promises);

    apis.forEach((type, index) => {
      params[type] = responses[index].data;
    });

    res.render(template, params);
  })();
};

module.exports = stakeholderRouter;
