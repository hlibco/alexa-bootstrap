const Alexa = require('./alexa')
const Card = require('./card')

class Response {
  constructor (options, session) {
    this.aborted = false
    this.options = options
    this._session = session
    /*
    shouldEndSession: bool
    outputSpeech: {}
    directives: []
    reprompt: {}
    card: {}
    */
    this.response = {
      repeat: options.repeat || true,
      shouldEndSession: options.shouldEndSession || false
    }
  }

  session () {
    return this._session
  }

  // Abort any intent (it will not prevent post hook to be executed)
  abort () {
    this.aborted = true
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
    // Set repeat data
    if (this.options.repeat) {
      this.repeat(null, null, rendered)
    }
    return this
  }

  repeat (ssml, meta, rendered) {
    this.session().set('__repeat', rendered || this.render(ssml, meta))
    return this
  }

  reprompt (ssml, meta) {
    this.response.reprompt = {
      outputSpeech: {
        type: Alexa.SpeechType.SSML,
        ssml: this.render(ssml, meta)
      }
    }
    return this
  }

  card () {
    const conf = {storage: this.options.storage}
    const card = new Card(arguments[0], arguments[1], arguments[2], arguments[3], conf)
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

  render (ssml, meta) {
    // remove any <speak> tags from the input string, if they exist. There can only be one set of <speak> tags.
    let txt = (ssml || '').replace(/<speak>/gi, ' ').replace(/<\/speak>/gi, ' ').trim()
    let tag = ''
    let val = ''
    let matches = txt.match(/{(.+?)}/g) || []
    matches.map(key => {
      tag = key.substr(1, key.length - 2)
      if (tag.indexOf('.') !== -1) {
        val = tag.split('.').reduce((o, i) => o[i], meta)
      } else {
        val = meta[tag]
      }
      txt = txt.replace(key, val)
    })

    txt = txt.replace(/ +/, ' ')
    return `<speak>${txt}</speak>`
  }

  format () {
    return {
      version: '1.0',
      response: this.response,
      sessionAttributes: this.session().getAttributes()
    }
  }
}

module.exports = Response
