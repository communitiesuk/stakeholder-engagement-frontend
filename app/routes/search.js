const Devour = require('devour-client');
const npmPkg = require('../../package.json');
const models = require('../lib/apis.json');

const searchRouter = (req, res) => {
  const template = 'app/views/search';
  const { query } = req;
  const params = {
    query
  };
  const jsonApi = new Devour({
    apiUrl: 'https://stakeholder-engagement-api.herokuapp.com/api/v1',
    'user-agent': `stakeholder-engagement-frontend/${
      npmPkg.version
    } (https://github.com/communitiesuk/stakeholder-engagement-frontend)`,
    pluralize: false
  });

  const types = ['people', 'role'];

  (async () => {
    types.map(type => jsonApi.define(type, models[type]));

    await Promise.all(
      types.map(type =>
        jsonApi.findAll('people', { filter: { search: query.search_field } })
      )
    ).then(function(responses) {
      types.forEach((type, index) => {
        params[type] = responses[index].data;
      });
    });

    res.render(template, params);
  })();
};

module.exports = searchRouter;
