const path = require('path')
const fs = require('fs')
// const Entities = require('html-entities').AllHtmlEntities
// const {encode} = new Entities()
const timeAgo = require('node-time-ago')

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
    return this
  }

  getCommentsAfterClosure() {
    if (!this.closed) return []
    
    const closureDate = new Date(this.closed_at)
    return this.comments.filter(comment => {
      return new Date(comment.created_at) > closureDate
    })
  }
}

module.exports = Issue
