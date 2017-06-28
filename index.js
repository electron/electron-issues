const Issue = require('./lib/issue')
const {chain} = require('lodash')
const issues = require('./issues.json').map(issue => new Issue(issue))
module.exports = chain(issues)
