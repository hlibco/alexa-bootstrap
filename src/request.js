'use strict'

const Debug = require('debug')('alexa-bootstrap:request')

class Request {
  constructor (json, session) {
    this.data = json
    this._tag = session.get('__tag')
    this._repeat = session.get('__repeat')
    this._session = session
  }

  session () {
    return this._session
  }

  /*
  Get the tag from the previous response
  or assert the tag name if specified
  */
  tag (name) {
    if (name) {
      return this._tag === name
    }
    return this._tag
  }

  /*
  Get the repeat message from the previous response
  */
  repeat () {
    return this._repeat || null
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
    return this.data.session.user.userId || this.data.context.System.user.userId
  }
  accessToken () {
    return this.data.session.user.accessToken || this.data.context.System.user.accessToken
  }
  applicationId () {
    return this.data.session.application.applicationId || this.data.context.System.application.applicationId
  }

  /*
  Intent name
  */
  intent () {
    try {
      if ('name' in this.data.request.intent) {
        return this.data.request.intent.name
      }
      return false
    } catch (e) {
      Debug('Missing intent in request:', e)
      return false
    }
  }

  /*
  Slot value
  */
  slot (slotName, defaultValue) {
    if (this.data.request.intent.slots && slotName in this.data.request.intent.slots) {
      return this.data.request.intent.slots[slotName].value || defaultValue || null
    } else if (defaultValue) {
      return defaultValue
    } else {
      Debug('Missing slot:', slotName)
      return null
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
