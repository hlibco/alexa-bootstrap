const Debug = require('debug')('alexa-bootstrap:request')

class Request {
  constructor (json, session) {
    this.tag = session.get('__tag')
    this.data = json
    this.session = session
  }

  /*
  Get the tag from the previous response
  */
  tag () {
    return this.tag
  }

  /*
  Raw request
  */
  raw () {
    return this.data
  }

  /*
  Default properties in the request object
  */
  id () {
    return this.data.request.requestId
  }
  type () {
    if (!(this.data && this.data.request && this.data.request.type)) {
      Debug('missing request type:', this.data)
      return
    }
    return this.data.request.type
  }
  timestamp () {
    return this.data.request.timestamp
  }
  locale () {
    return this.data.request.locale
  }

  /*
  Context object when available
  */
  context () {
    return this.data.context || {}
  }

  /*
  Identification
  */
  userId () {
    return this.data.session.user.userId || this.context.System.user.userId
  }
  accessToken () {
    return this.data.session.user.accessToken || this.context.System.user.accessToken
  }
  applicationId () {
    return this.data.session.application.applicationId || this.context.System.application.applicationId
  }

  /*
  Intent name
  */
  intent () {
    try {
      return this.data.request.intent.name
    } catch (e) {
      Debug('missing intent in request: ', e)
      return false
    }
  }

  /*
  Slot value
  */
  slot (slotName, defaultValue) {
    try {
      if (this.data.request.intent.slots && slotName in this.data.request.intent.slots) {
        return this.data.request.intent.slots[slotName].value
      } else {
        return defaultValue
      }
    } catch (e) {
      Debug('missing intent in request: ' + slotName, e)
      return defaultValue
    }
  }

  /*
  All slots with values
  */
  slots () {
    try {
      const slots = this.data.request.intent.slots || {}
      const data = {}

      for (let key in slots) {
        if (slots.hasOwnProperty(key) && slots[key].value) {
          data[key] = slots[key].value
        }
      }

      return data
    } catch (e) {
      Debug('No slots available', e)
    }
  }

  // Only in SessionEndedRequest
  reason () {
    return this.data.request.reason
  }

  // Only in SessionEndedRequest
  error () {
    return this.data.request.error
  }
}

module.exports = Request
