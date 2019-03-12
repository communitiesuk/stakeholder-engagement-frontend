const indexRouter = (req, res) => {
  const params = {}
  res.render('app/views/index', params)
};

module.exports = indexRouter;
