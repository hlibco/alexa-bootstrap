'use strict'

class Session {
  constructor (session) {
    this.session = session
    this.attributes = session.attributes || {}
  }

  get (key) {
    // getAttributes deep clones the attributes object, so updates to objects
    // will not affect the session until `set` is called explicitly
    return this.getAttributes()[key]
  }

  set (key, value) {
    this.attributes[key] = value
  }

  clear (key) {
    if (typeof key === 'string') {
      delete this.attributes[key]
    } else {
      this.attributes = {}
    }
  }

  /*
  Get custom attributes
  */
  getAttributes () {
  // deep clone attributes so direct updates to objects are not set in the
  // session unless `.set` is called explicitly
    return JSON.parse(JSON.stringify(this.attributes))
  }

  /*
  Access default attributes
  */
  id () {
    return this.session.sessionId
  }
  isNew () {
    return this.session.new
  }
}

module.exports = Session
