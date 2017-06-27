require('dotenv-safe').load()

const issues = require('ghissues')
const options = {
  user: process.env.GITHUB_USER,
  token: process.env.GITHUB_TOKEN
}

issues.list(options, 'electron', 'electron', {state: 'all'}, function (err, issuelist) {
  if (err) throw err
  process.stdout.write(JSON.stringify(issuelist, null, 2))
  process.exit()
})
