const issues = require('.')
const tableify = require('tableify')
// const {pick} = require('lodash')
const {titleCase} = require('change-case')

let datasets = {
  oldest_open_issues: {
    data: issues
      .filter('open')
      .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
      .slice(0, 10)
      .map(issue => {
        return {
          '#': issue.linkedNumber,
          title: issue.linkedTitle,
          opened: issue.opened
        }
      })
      .value()
  },

  top_open_issues_by_comment_count: {
    data: issues
      .filter('open')
      .sortBy('commentCount')
      .reverse()
      .slice(0, 10)
      .map(issue => {
        return {
          number: issue.linkedNumber,
          title: issue.linkedTitle,
          comments: issue.commentCount
        }
      })
      .value()
  },

  top_closed_issues_by_comment_count: {
    data: issues
      .filter('closed')
      .sortBy('commentCount')
      .reverse()
      .slice(0, 10)
      // .map(partialRight(pick, ['number', 'linkedTitle', 'opened']))
      .map(issue => {
        return {
          number: issue.linkedNumber,
          title: issue.linkedTitle,
          comments: issue.commentCount
        }
      })
      .value()
  }
}

Object.keys(datasets).forEach(slug => {
  console.log(`\n\n## ${titleCase(slug)}`)
  const dataset = datasets[slug]

  console.log(tableify(dataset.data))
})

// heading('New issues per month')
// const years = '2012 2013 2014 2015 2016 2017'.split(' ')
// const months = '01 02 03 04 05 06 07 08 09 10 11 12'.split(' ')
// const values = []
// years.forEach(year => {
//   months.forEach(month => {
//     const date = `${year}-${month}`
//     const issuesCreated = issues.filter(issue => !!issue.created_at.includes(date))
//     if (!issuesCreated.length) return
//     values.push({
//       date: date,
//       count: issuesCreated.length
//     })
//   })
// })

// values.forEach((thisMonth, i) => {
//   if (i === 0) return
//   const lastMonth = values[i - 1]
//   thisMonth.mom = parseInt((thisMonth.count - lastMonth.count) / lastMonth.count * 100)
// })

// console.log(`
// Month | Issues Opened | % Growth MoM
// ----- | ------------- | ------------`)
// values.reverse().forEach(value => {
//   const {date, count, mom} = value
//   console.log([date, count, mom].join(' | '))
// })

// function renderDate (issue) {
//   let line = `- [#${issue.number} - ${encode(issue.title)}](${issue.html_url}) (opened ${timeAgo(issue.created_at)})`
//   console.log(line)
// }

// function heading (text) {
//   console.log(`\n\n## ${text}\n\n`)
// }
