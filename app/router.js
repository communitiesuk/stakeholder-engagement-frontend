'use strict'

// Local dependencies
const healthcheck = require('./healthcheck')
const engagement = require('./engagement')
const index = require('./index')

// Export
module.exports.bind = app => {
  app.use(healthcheck.router)
  app.use(engagement.router)
  app.use(index.router)
}
