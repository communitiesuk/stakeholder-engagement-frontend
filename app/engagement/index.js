'use strict'

// Npm dependencies
const express = require('express')

// Local dependencies
const indexController = require('./index.controller')
const nextController = require('./next.controller')
const summaryController = require('./summary.controller')

// Initialisation
const router = new express.Router()

const paths = {
  index: '/engagement',
  nextSteps: '/engagement/next-steps',
  summary: '/engagement/summary'
}

// Routing
router.get(paths.index, indexController)
router.get(paths.nextSteps, nextController)
router.get(paths.summary, summaryController)

// Export
module.exports = {
  router,
  paths
}
