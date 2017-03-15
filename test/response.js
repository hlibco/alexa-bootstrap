import test from 'ava'
const Response = require('../src/response')
const Session = require('../src/session')
const Card = require('../src/card')

const json = {
  'version': '1.0',
  'session': {
    'new': false,
    'sessionId': 'amzn1.echo-api.session.0000000-0000-0000-0000-00000000000',
    'application': {
      'applicationId': 'amzn1.echo-sdk-ams.app.000000-d0ed-0000-ad00-000000d00ebe'
    },
    'attributes': {
      'city': 'San Francisco'
    },
    'user': {
      'userId': 'amzn1.account.AM3B00000000000000000000000',
      'accessToken': 'AUQ8-JAHN2-982hA'
    }
  },
  'context': {
    'System': {
      'application': {
        'applicationId': 'amzn1.echo-sdk-ams.app.000000-d0ed-0000-ad00-000000d00ebe'
      },
      'user': {
        'userId': 'amzn1.account.AM3B00000000000000000000000'
      }
    }
  },
  'request': {
    'type': 'IntentRequest',
    'requestId': 'amzn1.echo-api.response.0000000-0000-0000-0000-00000000000',
    'timestamp': '2015-05-13T12:34:56Z',
    'locale': 'en-US',
    'intent': {
      'name': 'GetZodiacHoroscopeIntent',
      'slots': {
        'ZodiacSign': {
          'name': 'ZodiacSign',
          'value': 'virgo'
        },
        'Color': {
          'name': 'Color',
          'value': ''
        }
      }
    }
  }
}

test(`session()`, t => {
  const session = new Session(json.session)
  const response = new Response({}, session)

  t.deepEqual(response.session(), session)
})

test(`abort()`, t => {
  const session = new Session(json.session)
  const response = new Response({}, session)
  response.abort()
  t.true(response.aborted)
})

test(`tag(milestone)`, t => {
  const _json = JSON.parse(JSON.stringify(json))
  const session = new Session(_json.session)
  const response = new Response({}, session)
  response.tag('milestone')

  t.is(session.get('__tag'), 'milestone')
})

test(`say(abc)`, t => {
  const _json = JSON.parse(JSON.stringify(json))
  const session = new Session(_json.session)
  const response = new Response({repeat: true}, session)
  response.say('abc')
  const expected = {
    type: 'SSML',
    ssml: '<speak>abc</speak>'
  }
  t.deepEqual(response.response.outputSpeech, expected)
  t.is(session.get('__repeat'), expected.ssml)
})

test(`repeat(abc)`, t => {
  const _json = JSON.parse(JSON.stringify(json))
  const session = new Session(_json.session)
  const response = new Response({}, session)
  response.repeat('abc')

  t.is(session.get('__repeat'), '<speak>abc</speak>')
})

test(`reprompt(abc)`, t => {
  const _json = JSON.parse(JSON.stringify(json))
  const session = new Session(_json.session)
  const response = new Response({}, session)
  response.reprompt('abc')

  const expected = {
    outputSpeech: {
      type: 'SSML',
      ssml: '<speak>abc</speak>'
    }
  }

  t.deepEqual(response.response.reprompt, expected)
})

test(`card()`, t => {
  const session = new Session(json.session)
  const response = new Response({}, session)
  response.card('title', 'body content')
  t.truthy(response.response.card)
})

test(`linkAccount()`, t => {
  const session = new Session(json.session)
  const response = new Response({}, session)
  response.linkAccount()
  t.deepEqual(response.response.card, new Card().linkAccount())
})

test(`end()`, t => {
  const session = new Session(json.session)
  const response = new Response({}, session)
  response.end()
  t.true(response.response.shouldEndSession)
  t.deepEqual(session.attributes, {})
})

test(`render(ssml, meta)`, t => {
  const session = new Session(json.session)
  const response = new Response({}, session)
  t.is(response.render('Hello'), '<speak>Hello</speak>')
  t.is(response.render('Hello {city}', {city: 'London'}), '<speak>Hello London</speak>')
  t.is(response.render('Hello {city.name}', {city: {name: 'London'}}), '<speak>Hello London</speak>')
})

test(`format()`, t => {
  const session = new Session(json.session)
  const response = new Response({}, session)
  const expected = {
    version: '1.0',
    response: {
      repeat: true,
      shouldEndSession: false
    },
    sessionAttributes: {
      'city': 'San Francisco'
    }
  }
  t.deepEqual(response.format(), expected)
})
