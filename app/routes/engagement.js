const engagementRouter = (req, res) => {
  const params = {
    message: `Hello, world!`
  }
  res.render('app/views/engagement/index', params)
};

module.exports = engagementRouter;
