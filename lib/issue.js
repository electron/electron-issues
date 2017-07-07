const path = require('path')
const fs = require('fs')
// const Entities = require('html-entities').AllHtmlEntities
// const {encode} = new Entities()
const timeAgo = require('node-time-ago')
const sentiment = require('./sentiment')

class Issue {
  constructor (props) {
    Object.assign(this, props)
    const commentsFile = path.join(__dirname, `../comments/${this.number}.json`)
    this.comments = fs.existsSync(commentsFile) ? require(commentsFile) : []
    this.commentCount = this.comments.length
    this[this.state] = true // this.open, this.closed, etc
    this.opened = timeAgo(this.created_at)

    this.linkedNumber = `<a href="${this.html_url}">${this.number}</a>`
    this.linkedTitle = `<a href="${this.html_url}">${this.title}</a>`

    this.commentsAfterClosure = this.getCommentsAfterClosure()
    this.commentsAfterClosureCount = this.commentsAfterClosure.length
    this.sentimentScore = this.getSentimentScore(this.comments)
    this.postClosureSentimentScore = this.getSentimentScore(this.commentsAfterClosure)
    this.positiveWords = this.getPositiveWords().join(', ')
    this.negativeWords = this.getNegativeWords().join(', ')
    return this
  }

  getCommentsAfterClosure () {
    if (!this.closed) return []
    
    const closureDate = new Date(this.closed_at)
    return this.comments.filter(comment => {
      return new Date(comment.created_at) > closureDate
    })
  }

  getSentimentScore (comments) {
    if (!comments || !comments.length) return 0

    const total = comments
      .map(comment => {
        comment.sentiment = sentiment(comment.body)
        return comment.sentiment.score
      })
      .reduce((a, b) => {return a + b}, 0)
    return Math.round(total / comments.length)
  }

  getPositiveWords () {
    let words = []
    this.comments.forEach(comment => {
      comment.sentiment.positive.forEach(word => {
        if (!words.includes(word)) words.push(word)
      })
    })
    return words
  }

  getNegativeWords () {
    let words = []
    this.comments.forEach(comment => {
      comment.sentiment.negative.forEach(word => {
        if (!words.includes(word)) words.push(word)
      })
    })
    return words
  }

}

module.exports = Issue
