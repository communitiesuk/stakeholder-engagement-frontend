const JsonApi = require('devour-client');
const npmPkg = require('/package.json');

const dashboardRouter = (req, res) => {
  const params = {};
  const jsonApi = new JsonApi({
    apiUrl: 'https://stakeholder-engagement-api.herokuapp.com/api/v1'
  });

  // model
  jsonApi.define('region', {
    slug: '',
    name: '',
    nuts_code: '',
    created_at: '',
    updated_at: ''
  });

  // -- Middleware
  let requestMiddleware = {
    name: 'add-headers',
    req: (payload) => {

      if (payload.req.method === 'GET') {
        payload.req.headers = {
          'Accept': 'application/json',
          'user-agent': `stakeholder-engagement-frontend/${npmPkg.version} (https://github.com/communitiesuk/stakeholder-engagement-frontend)`
        }
      }
      return payload
    }
  };
  let responseMiddleware = {
    name: 'populate-params',
    res: (payload) => {
      params.regions = payload.data;
      renderPage();

      return payload
    }
  };

  jsonApi.insertMiddlewareBefore('axios-request', requestMiddleware)
  jsonApi.insertMiddlewareAfter('response', responseMiddleware)

  // -- deconstruct response
  let { data, errors, meta, links } = jsonApi.findAll('region');
  // params.regions = data;
  // workaround until jsonAPI is amended
  renderPage = () => {
    res.render('app/views/dashboard', params);
  }
};

module.exports = dashboardRouter;
