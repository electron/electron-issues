const sentiment = require('sentiment')
const weights = {
  commit: 0,
  error: 0, 
  false: 0,
  like: 0,
  no: 0,
  true: 0,
  yeah: 0
}

module.exports = function (string) {
  return sentiment(string, weights)
}
