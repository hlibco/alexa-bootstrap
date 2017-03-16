const Debug = require('debug')('alexa-bootstrap:index')
const Alexa = require('./alexa')

const Request = require('./request')
const Session = require('./session')
const Response = require('./response')

class App {
  constructor (options) {
    this.options = options || {}
    this.intents = {}
    this.constants = Alexa
    this.preFunction = null
    this.postFunction = null
    this.launchFunction = null
    this.sessionEndedFunction = null
  }

  /* request, response, type */
  pre (func) {
    if (typeof func === 'function') {
      Debug('Register Pre')
      this.preFunction = func
    }
  }

  /* request, response, type */
  post (func) {
    if (typeof func === 'function') {
      Debug('Register Post')
      this.postFunction = func
    }
  }

  launch (func) {
    if (typeof func === 'function') {
      Debug('Register Launch')
      this.launchFunction = func
    }
  }

  intent (name, schema, func) {
    if (typeof schema === 'function') {
      func = schema
      schema = null
    }

    if (typeof func === 'function') {
      Debug(`Register ${name}Intent`)
      this.intents[name] = {
        name,
        function: func
      }
      if (schema) {
        this.intents[name].schema = schema
      }
    }
  }

  sessionEnded (func) {
    if (typeof func === 'function') {
      this.sessionEndedFunction = func
    }
  }

  request (json) {
    const self = this
    const session = new Session(json.session)
    const request = new Request(json, session)
    const response = new Response(self.options, session)

    Debug('requesting...', request.type())

    return Promise.resolve().then(() => {
      if (self.preFunction) {
        return Promise.resolve(self.preFunction(request, response))
      }
    }).then(() => {
      if (response.aborted) {
        return Promise.resolve()
      }

      switch (request.type()) {
        case Alexa.Request.Launch:
          if (self.launchFunction) {
            return Promise.resolve(self.launchFunction(request, response))
          } else {
            return Promise.reject('LAUNCH_FUNCTION_NOT_FOUND')
          }
        case Alexa.Request.SessionEnded:
          if (self.sessionEndedFunction) {
            return Promise.resolve(self.sessionEndedFunction(request, response))
          }
          return Promise.resolve()
        case Alexa.Request.Intent:
          const intent = request.intent()
          if (self.intents[intent]) {
            return Promise.resolve(self.intents[intent]['function'](request, response, request.slots()))
          } else {
            return Promise.reject('INTENT_NOT_FOUND')
          }
        default:
          return Promise.reject('INVALID_REQUEST_TYPE')
      }
    // }).catch(e => {
    //   Debug('Error on Pre or Intent', e)
    }).then(() => {
      if (self.postFunction) {
        return Promise.resolve(self.postFunction(request, response))
      }
    }).then(() => {
      return response.format()
    }).catch(e => {
      Debug('Error on Post or formatting the response', e)
      throw Error(e)
    })
  }
}

module.exports = App
