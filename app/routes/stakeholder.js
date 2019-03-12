const Devour = require('devour-client');
const npmPkg = require('../../package.json');

const stakeholderRouter = (req, res) => {
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
          jsonApi: 'hasMany',
          type: 'roles'
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
        jsonApi.findAll('people', { filter: { slug: stakeholder } })
      )
    );

    apis.forEach(({ type }, index) => {
      params[type] = responses[index].data;
			console.log('TCL: responses', responses)
    });

    res.render('app/views/stakeholder', params);
  })();
};

module.exports = stakeholderRouter;
