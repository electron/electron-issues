require('dotenv-safe').load()

const path = require('path')
const fs = require('fs')
const gh = require('ghissues')
const issues = require('./issues.json')
const options = {
  user: process.env.GITHUB_USER,
  token: process.env.GITHUB_TOKEN
}
let i = issues.map(issue => issue.number).sort((a, b) => a - b).pop() + 1

function getComments () {
  if (--i === 0) return process.exit()

  let filename = path.join(__dirname, `comments/${i}.json`)

  if (fs.existsSync(filename)) {
    console.error(`${filename} (exists; skipping)`)
    return getComments()
  }

  console.error(filename)
  gh.listComments(options, 'electron', 'electron', i, function (err, comments) {
    if (err) console.log(err)

    if (!comments) {
      return getComments()
    }

    fs.writeFileSync(filename, JSON.stringify(comments, null, 2))
    getComments()
  })
}

getComments()
