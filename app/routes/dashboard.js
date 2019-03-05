// import JsonApi from 'devour-client';
const JsonApi = require('devour-client')

const dashboardRouter = (req, res) => {

  const jsonApi = new JsonApi({
    apiUrl: 'https://stakeholder-engagement-api.herokuapp.com/api/v1/'
  });
  let requestMiddleware = {
    name: 'add-headers',
    req: (payload) => {
      if (payload.req.method === 'GET') {
        payload.req.headers = {
          "Accept" : "application/json"
        }
      }
      return payload
    }
  };
  jsonApi.insertMiddlewareBefore('axios-request', requestMiddleware)

  jsonApi.define('region', {
    id: '',
    slug: '',
    name: '',
    nuts_code: '',
    created_at: '',
    updated_at: ''
  });

  const regions = jsonApi.findAll('region');

  const params = {
    regions
  };

  res.render('app/views/dashboard', params);
};

module.exports = dashboardRouter;
