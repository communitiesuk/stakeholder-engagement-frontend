const Devour = require('devour-client');
const npmPkg = require('../../package.json');

const searchRouter = (req, res) => {
  const { query } = req;
  params = {
    query
  };

  const jsonApi = new Devour({
    apiUrl: 'https://stakeholder-engagement-api.herokuapp.com/api/v1',
    'user-agent': `stakeholder-engagement-frontend/${
      npmPkg.version
    } (https://github.com/communitiesuk/stakeholder-engagement-frontend)`,
    pluralize: false
  });
  const apis = [
    {
      type: 'people',
      model: {
        id: '',
        slug: '',
        name: '',
        title: '',
        created_at: '',
        updated_at: '',
        roles: {
          jsonApi : 'hasMany',
          type : 'roles'
        }
      }
    },
    {
      type: 'role',
      model: {
        id: '',
        slug: '',
        name: '',
        role_type: ''
      }
    }
  ];

  apis.forEach(({ type, model }, index) => {
    jsonApi.define(type, model);
  });

  (async () => {
    const responses = await Promise.all(
      apis.map(({ type }) =>
        jsonApi.findAll('people', { filter: { search: query.search_field } })
      )
    );

    apis.forEach(({ type }, index) => {
      params[type] = responses[index].data;
    });

    res.render('app/views/search', params);
  })();
};

module.exports = searchRouter;
