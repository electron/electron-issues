const sentiment = require('sentiment')
const weights = {
  error: 0, 
  commit: 0
}

module.exports = function (string) {
  return sentiment(string, weights)
}
