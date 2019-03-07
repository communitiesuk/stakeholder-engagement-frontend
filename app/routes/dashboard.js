const JsonApi = require('devour-client');
const npmPkg = require('../../package.json');

const dashboardRouter = (req, res) => {
  const jsonApi = new JsonApi({
    apiUrl: 'https://stakeholder-engagement-api.herokuapp.com/api/v1'
  });

  // model
  jsonApi.define('region', {
    id: '',
    slug: "",
    name: "",
    nuts_code: "",
    created_at: "",
    updated_at: ""
  });

  // -- deconstruct response
  jsonApi.findAll('region')
  .then(function(response) {
    let { data, errors, meta, links } = response;
    res.render('app/views/dashboard', {regions : data});
  });
};

module.exports = dashboardRouter;
