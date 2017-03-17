import test from 'ava'
const Request = require('../src/request')
const Session = require('../src/session')
const jsonSessionEndedRequest = {
  'version': '1.0',
  'session': {
    'new': false,
    'sessionId': 'amzn1.echo-api.session.0000000-0000-0000-0000-00000000000',
    'application': {
      'applicationId': 'amzn1.echo-sdk-ams.app.000000-d0ed-0000-ad00-000000d00ebe'
    },
    'attributes': {
      'supportedHoroscopePeriods': {
        'daily': true,
        'weekly': false,
        'monthly': false
      }
    },
    'user': {
      'userId': 'amzn1.account.AM3B00000000000000000000000'
    }
  },
  'context': {
    'System': {
      'application': {
        'applicationId': 'amzn1.echo-sdk-ams.app.000000-d0ed-0000-ad00-000000d00ebe'
      },
      'user': {
        'userId': 'amzn1.account.AM3B00000000000000000000000'
      },
      'device': {
        'supportedInterfaces': {
          'AudioPlayer': {}
        }
      }
    }
  },
  'request': {
    'type': 'SessionEndedRequest',
    'requestId': 'amzn1.echo-api.request.0000000-0000-0000-0000-00000000000',
    'timestamp': '2015-05-13T12:34:56Z',
    'reason': 'USER_INITIATED',
    'locale': 'en-US',
    'error': {
      'type': 'INVALID_RESPONSE',
      'message': 'Error message'
    }
  }
}

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
    'requestId': 'amzn1.echo-api.request.0000000-0000-0000-0000-00000000000',
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

test(`repeat()`, t => {
  const _json = JSON.parse(JSON.stringify(json))
  const session = new Session(_json.session)
  session.set('__repeat', 'here again')
  const request = new Request(_json, session)

  t.is(request.repeat(), 'here again')
})

test(`raw()`, t => {
  const session = new Session(json.session)
  const request = new Request(json, session)

  t.deepEqual(request.raw(), json)
})

test(`id()`, t => {
  const session = new Session(json.session)
  const request = new Request(json, session)

  t.is(request.id(), 'amzn1.echo-api.request.0000000-0000-0000-0000-00000000000')
})

test(`type()`, t => {
  const session = new Session(json.session)
  const request = new Request(json, session)

  t.is(request.type(), 'IntentRequest')
})

test(`timestamp()`, t => {
  const session = new Session(json.session)
  const request = new Request(json, session)

  t.is(request.timestamp(), '2015-05-13T12:34:56Z')
})

test(`locale()`, t => {
  const session = new Session(json.session)
  const request = new Request(json, session)

  t.is(request.locale(), 'en-US')
})

test(`context()`, t => {
  const session = new Session(json.session)
  const request = new Request(json, session)

  t.deepEqual(request.context(), json.context)
})

test(`userId()`, t => {
  const session = new Session(json.session)
  const request = new Request(json, session)

  t.is(request.userId(), 'amzn1.account.AM3B00000000000000000000000')
})

test(`accessToken()`, t => {
  const session = new Session(json.session)
  const request = new Request(json, session)

  t.is(request.accessToken(), 'AUQ8-JAHN2-982hA')
})

test(`applicationId()`, t => {
  const session = new Session(json.session)
  const request = new Request(json, session)

  t.is(request.applicationId(), 'amzn1.echo-sdk-ams.app.000000-d0ed-0000-ad00-000000d00ebe')
})

test(`intent()`, t => {
  const session = new Session(json.session)
  const request = new Request(json, session)

  t.is(request.intent(), 'GetZodiacHoroscopeIntent')
})

test(`slot(ZodiacSign)`, t => {
  const session = new Session(json.session)
  const request = new Request(json, session)

  t.is(request.slot('ZodiacSign'), 'virgo')
})

test(`slot(Color)`, t => {
  const session = new Session(json.session)
  const request = new Request(json, session)

  t.is(request.slot('Color'), null)
})

test(`slot(Color, Blue)`, t => {
  const session = new Session(json.session)
  const request = new Request(json, session)

  t.is(request.slot('Color', 'Blue'), 'Blue')
})

test(`slot(Planet, Earth)`, t => {
  const session = new Session(json.session)
  const request = new Request(json, session)

  t.is(request.slot('Planet', 'Earth'), 'Earth')
})

test(`reason()`, t => {
  const session = new Session(json.session)
  const request = new Request(json, session)

  t.falsy(request.reason())
})

test(`error()`, t => {
  const session = new Session(json.session)
  const request = new Request(json, session)

  t.falsy(request.error())
})

test(`reason()`, t => {
  const session = new Session(jsonSessionEndedRequest.session)
  const request = new Request(jsonSessionEndedRequest, session)

  t.is(request.reason(), 'USER_INITIATED')
})

test(`error()`, t => {
  const session = new Session(jsonSessionEndedRequest.session)
  const request = new Request(jsonSessionEndedRequest, session)
  const expect = {
    'type': 'INVALID_RESPONSE',
    'message': 'Error message'
  }

  t.deepEqual(request.error(), expect)
})
