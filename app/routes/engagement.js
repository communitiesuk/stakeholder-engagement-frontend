const engagementRouter = (req, res) => {
	console.log('engagementRouter -> req', req.session)
  res.render('app/views/engagement/index', params);
};

module.exports = engagementRouter;
