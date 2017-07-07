const issues = require('.')
const tableify = require('tableify')
// const {pick} = require('lodash')
const {titleCase} = require('change-case')
const MAX = 30

let datasets = {
  closed_issues_with_comments_after_closure: {
    data: issues
      .filter('closed')
      .sortBy('commentsAfterClosureCount')
      .reverse()
      .slice(0, MAX)
      .map(issue => {
        return {
          '#': issue.linkedNumber,
          title: issue.linkedTitle,
          commentsAfterClosure: issue.commentsAfterClosureCount
        }
      })
      .value()
  },

  closed_issues_with_low_sentiment_score_after_closure: {
    data: issues
      .filter('closed')
      .filter(issue => issue.commentCount > 2)      
      .sortBy('postClosureSentimentScore')
      .slice(0, MAX)
      .map(issue => {
        return {
          '#': issue.linkedNumber,
          title: issue.linkedTitle,
          words: issue.negativeWords,
          comments: issue.commentCount,
          sentiment: issue.postClosureSentimentScore
        }
      })
      .value()
  },
  
  closed_issues_with_high_sentiment_score: {
    data: issues
      .filter('closed')
      .filter(issue => issue.commentCount > 3)
      .sortBy('sentimentScore')
      .reverse()
      .slice(0, MAX)
      .map(issue => {
        return {
          '#': issue.linkedNumber,
          title: issue.linkedTitle,
          words: issue.positiveWords,
          comments: issue.commentCount,
          sentiment: issue.sentimentScore
        }
      })
      .value()
  },

  closed_issues_with_low_sentiment_score: {
    data: issues
      .filter('closed')
      .filter(issue => issue.commentCount > 3)      
      .sortBy('sentimentScore')
      .slice(0, MAX)
      .map(issue => {
        return {
          '#': issue.linkedNumber,
          title: issue.linkedTitle,
          words: issue.negativeWords,
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
          '#': issue.linkedNumber,
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
          '#': issue.linkedNumber,
          title: issue.linkedTitle,
          comments: issue.commentCount
        }
      })
      .value()
  },

  open_issues_with_high_sentiment_score: {
    data: issues
      .filter('open')
      .filter(issue => issue.commentCount > 3)
      .sortBy('sentimentScore')
      .reverse()
      .slice(0, MAX)
      .map(issue => {
        return {
          '#': issue.linkedNumber,
          title: issue.linkedTitle,
          words: issue.positiveWords,
          comments: issue.commentCount,
          sentiment: issue.sentimentScore
        }
      })
      .value()
  },

  open_issues_with_low_sentiment_score: {
    data: issues
      .filter('open')
      .filter(issue => issue.commentCount > 3)      
      .sortBy('sentimentScore')
      .slice(0, MAX)
      .map(issue => {
        return {
          '#': issue.linkedNumber,
          title: issue.linkedTitle,
          words: issue.negativeWords,
          comments: issue.commentCount,
          sentiment: issue.sentimentScore
        }
      })
      .value()
  }
}

console.log('# Electron Issues\n\n')

Object.keys(datasets).forEach(slug => {
  console.log(`- [${titleCase(slug)}](#${slug})`)
})

Object.keys(datasets).forEach(slug => {
  console.log(`\n\n<h2 id="${slug}">${titleCase(slug)}</h2>`)
  const dataset = datasets[slug]

  console.log(tableify(dataset.data))
})
