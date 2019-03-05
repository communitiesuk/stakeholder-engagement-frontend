const indexRouter = (req, res) => {
  const params = {
    message: `Hello, world!`
  }
  res.render('app/views/index', params)
};

module.exports = indexRouter;
