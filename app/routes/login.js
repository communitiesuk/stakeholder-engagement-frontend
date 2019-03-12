const loginRouter = (req, res) => {
  const params = {
    loggedin: true
  };
  console.log(req.body);
  res.redirect(302, 'dashboard');
};

module.exports = loginRouter;
