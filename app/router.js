const express = require("express");
const router = express.Router();

// --------------------------------------------------------------
const indexRouter = require("./routes/index.js");
const dashboardRouter = require("./routes/dashboard.js");
const engagementRouter = require("./routes/engagement.js");
const loginRouter = require("./routes/login.js");

const healthcheckRouter = require("./routes/healthcheck.js");
const engagementCheckRouter = require("./routes/engagement-check.js");


// -------------------------------------------------------------- /index
router.get("/", indexRouter);
// -------------------------------------------------------------- /dashboard
router.get("/dashboard", dashboardRouter);
// -------------------------------------------------------------- /healthcheck
router.get("/healthcheck", healthcheckRouter);

// -------------------------------------------------------------- /dashboard
router.post("/login", loginRouter);
// -------------------------------------------------------------- engagement
router.post("/engagement/:step?", engagementCheckRouter);

// --------------------------------------------------------------
module.exports = router;
