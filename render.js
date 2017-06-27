const Entities = require('html-entities').AllHtmlEntities 
const {encode} = new Entities()
const timeAgo = require('node-time-ago')
const issues = require('./issues.json')
  .sort((a, b) => b.comments - a.comments)

const openIssues = issues.filter(issue => issue.state === 'open')
const closedIssues = issues.filter(issue => issue.state === 'closed')

console.log(`
# Electron Issues

> A study of the issues filed on [electron/electron](https://github.com/electron/electron/issues)

`)

console.log(`
There are ${openIssues.length} open issues and ${closedIssues.length} closed issues.
`)

heading('Oldest Open Issues')
openIssues
  .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
  .slice(0,100)
  .map(renderDate)

heading('Top Open Issues by comment count')
openIssues
  .slice(0,100)
  .map(renderComments)

heading('Top Closed Issues by comment count')
closedIssues
  .filter(issue => issue.state === 'closed')
  .slice(0,100)
  .map(renderComments)

heading('New issues per month')
const years = '2012 2013 2014 2015 2016 2017'.split(' ')
const months = '01 02 03 04 05 06 07 08 09 10 11 12'.split(' ')
const values = []
years.forEach(year => {
  months.forEach(month => {
    const date = `${year}-${month}`
    const issuesCreated = issues.filter(issue => !!issue.created_at.includes(date))
    if (!issuesCreated.length) return
    values.push({
      date: date,
      count: issuesCreated.length
    })
  })
})

values.forEach((thisMonth, i) => {
  if (i == 0) return
  const lastMonth = values[i-1]
  thisMonth.mom = parseInt((thisMonth.count - lastMonth.count) / lastMonth.count * 100)
})

console.log(`
Month | Issues Opened | % Growth MoM
----- | ------------- | ------------`)
values.reverse().forEach(value => {
  const {date, count, mom} = value
  console.log([date, count, mom].join(' | '))
})

function renderComments (issue) {
  let line = `- [#${issue.number} - ${encode(issue.title)}](${issue.html_url}) (${issue.comments} comments)`
  console.log(line)
}

function renderDate (issue) {
  let line = `- [#${issue.number} - ${encode(issue.title)}](${issue.html_url}) (opened ${timeAgo(issue.created_at)})`
  console.log(line)
}

function heading (text) {
  console.log(`\n\n## ${text}\n\n`)
}
