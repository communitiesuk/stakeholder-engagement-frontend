const loginRouter = (req, res) => {
  const params = {
    loggedin: true
  };
  res.redirect(302, 'dashboard');
};

module.exports = loginRouter;
