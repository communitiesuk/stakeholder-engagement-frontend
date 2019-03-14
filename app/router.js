const express = require('express');
const router = express.Router();

// --------------------------------------------------------------
const dashboardRouter = require('./routes/dashboard.js');
const engagementRouter = require('./routes/engagement.js');
const healthcheckRouter = require('./routes/healthcheck.js');
const indexRouter = require('./routes/index.js');
const loginRouter = require('./routes/login.js');
const searchRouter = require('./routes/search.js');
const stakeholderRouter = require('./routes/stakeholder.js');

// -------------------------------------------------------------- /get
router.get('/', indexRouter);
router.get('/dashboard', dashboardRouter);
router.get('/healthcheck', healthcheckRouter);
router.get('/search', searchRouter);
// -------------------------------------------------------------- /login
router.post('/login', loginRouter);
// -------------------------------------------------------------- /stakeholder & engagements
router.get('/stakeholder/:id/engagement/new', engagementRouter);
router.post('/stakeholder/:id/engagement/:step?', engagementRouter);
router.get('/stakeholder/:id', stakeholderRouter);

// --------------------------------------------------------------
module.exports = router;
