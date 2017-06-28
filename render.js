const issues = require('.')
const tableify = require('tableify')
// const {pick} = require('lodash')
const {titleCase} = require('change-case')
const MAX = 20

let datasets = {
  closed_issues_with_comments_after_closure: {
    data: issues
      .filter('closed')
      .sortBy('commentsAfterClosureCount')
      .reverse()
      .slice(0, MAX)
      .map(issue => {
        return {
          number: issue.linkedNumber,
          title: issue.linkedTitle,
          commentsAfterClosure: issue.commentsAfterClosureCount
        }
      })
      .value()
  },

  high_sentiment_score: {
    data: issues
      .filter(issue => issue.commentCount > 3)
      .sortBy('sentimentScore')
      .reverse()
      .slice(0, MAX)
      .map(issue => {
        return {
          number: issue.linkedNumber,
          title: issue.linkedTitle,
          comments: issue.commentCount,
          sentiment: issue.sentimentScore
        }
      })
      .value()
  },

  low_sentiment_score: {
    data: issues
      .filter(issue => issue.commentCount > 3)
      .sortBy('sentimentScore')
      .slice(0, MAX)
      .map(issue => {
        return {
          number: issue.linkedNumber,
          title: issue.linkedTitle,
          comments: issue.commentCount,
          sentiment: issue.sentimentScore
        }
      })
      .value()
  },
  
  oldest_open_issues: {
    data: issues
      .filter('open')
      .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
      .slice(0, MAX)
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
      .slice(0, MAX)
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
      .slice(0, MAX)
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
