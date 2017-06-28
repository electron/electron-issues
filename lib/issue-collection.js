// const Issue = require('./issue')

// class IssueCollection extends Array {
//   constructor (issues) {
//     super()
//     console.log('typeof issues', typeof issues)
//     issues.forEach(issue => {
//       this.push(issue.classy ? issue : new Issue(issue))
//     })
//     return this
//   }

//   get (number) {
//     return this.find(issue => issue.number === number)
//   }

//   get closed () {
//     console.log('what')
//     const matches = this.filter(issue => issue.state === 'closed')
//     console.log('matches', matches)
//     return new IssueCollection(matches)
//   }

//   get open () {
//     return new IssueCollection(this.filter(issue => issue.open))
//   }
// }

// module.exports = IssueCollection
