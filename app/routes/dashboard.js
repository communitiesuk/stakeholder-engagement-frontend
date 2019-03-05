const dashboardRouter = (req, res) => {
  const params = {
    message: `Hello, world!`
  }
  res.render('app/views/dashboard', params)
};

module.exports = dashboardRouter;
