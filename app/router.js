const express = require("express");
const router = express.Router();
// --------------------------------------------------------------
const indexRouter = require("./routes/index.js");
const dashboardRouter = require("./routes/dashboard.js");
const healthcheckRouter = require("./routes/healthcheck.js");
const engagementRouter = require("./routes/engagement.js");
// -------------------------------------------------------------- /engagement
router.get("/", indexRouter);
// -------------------------------------------------------------- /engagement
router.get("/dashboard", dashboardRouter);
// -------------------------------------------------------------- /engagement
router.get("/healthcheck", healthcheckRouter);
// -------------------------------------------------------------- export
router.get("/engagement/:step?", engagementRouter);
// -------------------------------------------------------------- export

module.exports = router;
