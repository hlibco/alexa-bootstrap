'use strict'

const Debug = require('debug')('alexa-bootstrap:response')
const Alexa = require('./alexa')
const Card = require('./card')

class Response {
  constructor (options, session) {
    this.msg = (options.messages && options.messages.source) || {}
    this.tags = options.tags || {}
    this.globals = (options.messages && options.messages.globals) || {}
    this.aborted = false
    this.options = Object.assign({}, {
      repeat: true,
      reprompt: true,
      shouldEndSession: false
    }, options)
    this.response = {}
    this._session = session
    this.clear()
    /*
    card: {}
    reprompt: {}
    directives: []
    outputSpeech: {}
    shouldEndSession: bool
    */
  }

  session () {
    return this._session
  }

  // Abort any intent (it will not prevent post hook to be executed)
  abort () {
    this.aborted = true
    return this
  }

  clear () {
    this.response = {
      shouldEndSession: this.options.shouldEndSession
    }
    return this
  }

  // Assign a tag to the response
  tag (name) {
    if (name) {
      this.session().set('__tag', name)
    }
    return this
  }

  say (ssml, meta) {
    const rendered = this.render(ssml, meta)
    this.response.outputSpeech = {
      type: Alexa.SpeechType.SSML,
      ssml: rendered
    }

    // Clear repeat
    this.session().clear('__repeat')

    // Set repeat data
    if (this.options.repeat) {
      this.repeat(null, null, rendered)
    }

    // Set reprompt
    if (this.options.reprompt) {
      this.reprompt(null, null, rendered)
    }

    return this
  }

  repeat (ssml, meta, rendered) {
    this.session().set('__repeat', rendered || this.render(ssml, meta))
    return this
  }

  reprompt (ssml, meta, rendered) {
    if (!ssml) {
      try {
        delete this.response.reprompt
      } catch (e) {
        Debug('Error removing reprompt', e)
      }
    }
    this.response.reprompt = {
      outputSpeech: {
        type: Alexa.SpeechType.SSML,
        ssml: rendered || this.render(ssml, meta)
      }
    }
    return this
  }

  expect () {
    this.session().set('__expect', arguments)
  }

  // title, body, images, meta, conf
  card () {
    const conf = {storage: this.options.storage}

    let title = arguments[0]
    if (title && arguments[3]) {
      title = this.render(title, arguments[3], false)
    }

    let body = arguments[1]
    if (body && arguments[3]) {
      body = this.render(body, arguments[3], false)
    }

    const card = new Card(title, body, arguments[2], conf)
    card.storage = this.options.storage
    this.response.card = card.format()
    return this
  }

  linkAccount () {
    this.response.card = new Card().linkAccount()
    return this
  }

  end () {
    this.response.shouldEndSession = true
    this.session().clear()
    return this
  }

  render (ssml, meta, speak = true) {
    // remove any <speak> tags from the input string, if they exist. There can only be one set of <speak> tags.
    let txt = (ssml || '').replace(/<speak>/gi, ' ').replace(/<\/speak>/gi, ' ').trim()
    let tag = ''
    let val = ''
    let matches = txt.match(/{(.+?)}/g) || []
    const data = Object.assign({}, this.globals, meta || {})

    matches.map(key => {
      tag = key.substr(1, key.length - 2)
      if (tag.indexOf('.') !== -1) {
        val = tag.split('.').reduce((o, i) => o[i], data)
      } else {
        try {
          val = data[tag]
        } catch (e) {
          throw new Error(`Property ${tag} is not available in \r\n"${txt}"\r\n`)
        }
      }
      txt = txt.replace(key, val)
    })

    txt = txt.replace(/ +/, ' ')
    return speak ? `<speak>${txt}</speak>` : txt
  }

  send () {
    // When called in the pre() hook, abort intent()
    this.abort()

    return {
      version: '1.0',
      response: this.response,
      sessionAttributes: this.session().getAttributes()
    }
  }
}

module.exports = Response
