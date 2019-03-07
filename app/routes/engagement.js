const engagementRouter = (req, res) => {
  const params = {
    message: `Hello, world!`
  }
  res.render('app/views/forms/index', params)
};

module.exports = engagementRouter;
