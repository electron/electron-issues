require('chai').should()
const {describe, it} = require('mocha')
const issues = require('.').value()

describe('Issues', () => {
  it('is an array', () => {
    issues.should.be.an('array')
    issues.length.should.be.above(9 * 1000)
  })

  it('has nearly 10,000 issues', () => {
    issues.length.should.be.above(9 * 1000)
  })

  describe('each issue', () => {
    const issue = issues.find(issue => issue.number === 6666)

    it('has a comments array', () => {
      issue.comments.should.be.an('array')
      issue.comments.length.should.be.above(4)
    })

    it('has `closed` property if it is closed', () => {
      issue.closed.should.equal(true)
      issue.state.should.equal('closed')
    })
  })
})
