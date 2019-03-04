'use strict'

module.exports = (req, res) => {
  const params = {
    message: `Hello, world!`
  }
  res.render('app/engagement/summary', params)
}
