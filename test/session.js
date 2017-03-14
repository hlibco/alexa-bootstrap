import test from 'ava'
const Session = require('../src/session')

test(`get(undefined)`, t => {
  const json = {
    'sessionId': 'SessionId.427810be-cf30-4314-88e9-dbf3cb9066a7',
    'application': {
      'applicationId': 'amzn1.echo-sdk-ams.app.4066aa4b-bc05-4a41-af1a-ab03bc977e10'
    },
    'attributes': {},
    'user': {
      'userId': 'amzn1.ask.account.AHZDSK3PNL34ROYLZNSRNNXN5GAB5UGADZLKCYSTGP5W7UHMRXSFVD6NYC2E6W3LFBMQQUZLQF6CWP5IQ3EAHYJ5YH3GWIXV6TOAS4CJ5NH62RKWRFVKIH7MYT5E65VXILVPDVLEJYN2KECDSYHITA4QWZPIY6J7SZVL7Z3MZT23X6GG63FPXKAS645FCQ232HU3QENZW2LB3RA',
      'accessToken': 'eyJhbGciOiJIUzI1NiJ9.NDM4OA.KC0mmLOUOMxB2L6UmXRn4j_f5-TztD4QR563tcdbF1Y'
    },
    'new': true
  }
  const session = new Session(json)

  t.falsy(session.get())
})

test(`get(color): blue`, t => {
  const json = {
    'sessionId': 'SessionId.427810be-cf30-4314-88e9-dbf3cb9066a7',
    'application': {
      'applicationId': 'amzn1.echo-sdk-ams.app.4066aa4b-bc05-4a41-af1a-ab03bc977e10'
    },
    'attributes': {
      'color': 'blue'
    },
    'user': {
      'userId': 'amzn1.ask.account.AHZDSK3PNL34ROYLZNSRNNXN5GAB5UGADZLKCYSTGP5W7UHMRXSFVD6NYC2E6W3LFBMQQUZLQF6CWP5IQ3EAHYJ5YH3GWIXV6TOAS4CJ5NH62RKWRFVKIH7MYT5E65VXILVPDVLEJYN2KECDSYHITA4QWZPIY6J7SZVL7Z3MZT23X6GG63FPXKAS645FCQ232HU3QENZW2LB3RA',
      'accessToken': 'eyJhbGciOiJIUzI1NiJ9.NDM4OA.KC0mmLOUOMxB2L6UmXRn4j_f5-TztD4QR563tcdbF1Y'
    },
    'new': true
  }
  const session = new Session(json)

  t.is(session.get('color'), 'blue')
})

test(`get(color): undefined`, t => {
  const json = {
    'sessionId': 'SessionId.427810be-cf30-4314-88e9-dbf3cb9066a7',
    'application': {
      'applicationId': 'amzn1.echo-sdk-ams.app.4066aa4b-bc05-4a41-af1a-ab03bc977e10'
    },
    'attributes': {},
    'user': {
      'userId': 'amzn1.ask.account.AHZDSK3PNL34ROYLZNSRNNXN5GAB5UGADZLKCYSTGP5W7UHMRXSFVD6NYC2E6W3LFBMQQUZLQF6CWP5IQ3EAHYJ5YH3GWIXV6TOAS4CJ5NH62RKWRFVKIH7MYT5E65VXILVPDVLEJYN2KECDSYHITA4QWZPIY6J7SZVL7Z3MZT23X6GG63FPXKAS645FCQ232HU3QENZW2LB3RA',
      'accessToken': 'eyJhbGciOiJIUzI1NiJ9.NDM4OA.KC0mmLOUOMxB2L6UmXRn4j_f5-TztD4QR563tcdbF1Y'
    },
    'new': true
  }
  const session = new Session(json)

  t.falsy(session.get('color'))
})

test(`set(color, red)`, t => {
  const json = {
    'sessionId': 'SessionId.427810be-cf30-4314-88e9-dbf3cb9066a7',
    'application': {
      'applicationId': 'amzn1.echo-sdk-ams.app.4066aa4b-bc05-4a41-af1a-ab03bc977e10'
    },
    'attributes': {
      'color': 'blue'
    },
    'user': {
      'userId': 'amzn1.ask.account.AHZDSK3PNL34ROYLZNSRNNXN5GAB5UGADZLKCYSTGP5W7UHMRXSFVD6NYC2E6W3LFBMQQUZLQF6CWP5IQ3EAHYJ5YH3GWIXV6TOAS4CJ5NH62RKWRFVKIH7MYT5E65VXILVPDVLEJYN2KECDSYHITA4QWZPIY6J7SZVL7Z3MZT23X6GG63FPXKAS645FCQ232HU3QENZW2LB3RA',
      'accessToken': 'eyJhbGciOiJIUzI1NiJ9.NDM4OA.KC0mmLOUOMxB2L6UmXRn4j_f5-TztD4QR563tcdbF1Y'
    },
    'new': true
  }
  const session = new Session(json)
  session.set('color', 'red')

  t.is(session.get('color'), 'red')
})

test(`getAttributes()`, t => {
  const json = {
    'sessionId': 'SessionId.427810be-cf30-4314-88e9-dbf3cb9066a7',
    'application': {
      'applicationId': 'amzn1.echo-sdk-ams.app.4066aa4b-bc05-4a41-af1a-ab03bc977e10'
    },
    'attributes': {
      'color': 'blue'
    },
    'user': {
      'userId': 'amzn1.ask.account.AHZDSK3PNL34ROYLZNSRNNXN5GAB5UGADZLKCYSTGP5W7UHMRXSFVD6NYC2E6W3LFBMQQUZLQF6CWP5IQ3EAHYJ5YH3GWIXV6TOAS4CJ5NH62RKWRFVKIH7MYT5E65VXILVPDVLEJYN2KECDSYHITA4QWZPIY6J7SZVL7Z3MZT23X6GG63FPXKAS645FCQ232HU3QENZW2LB3RA',
      'accessToken': 'eyJhbGciOiJIUzI1NiJ9.NDM4OA.KC0mmLOUOMxB2L6UmXRn4j_f5-TztD4QR563tcdbF1Y'
    },
    'new': true
  }
  const session = new Session(json)
  session.set('city', 'London')

  const expected = {
    color: 'blue',
    city: 'London'
  }

  t.deepEqual(session.getAttributes(), expected)
})

test(`clear(color)`, t => {
  const json = {
    'sessionId': 'SessionId.427810be-cf30-4314-88e9-dbf3cb9066a7',
    'application': {
      'applicationId': 'amzn1.echo-sdk-ams.app.4066aa4b-bc05-4a41-af1a-ab03bc977e10'
    },
    'attributes': {
      'color': 'blue'
    },
    'user': {
      'userId': 'amzn1.ask.account.AHZDSK3PNL34ROYLZNSRNNXN5GAB5UGADZLKCYSTGP5W7UHMRXSFVD6NYC2E6W3LFBMQQUZLQF6CWP5IQ3EAHYJ5YH3GWIXV6TOAS4CJ5NH62RKWRFVKIH7MYT5E65VXILVPDVLEJYN2KECDSYHITA4QWZPIY6J7SZVL7Z3MZT23X6GG63FPXKAS645FCQ232HU3QENZW2LB3RA',
      'accessToken': 'eyJhbGciOiJIUzI1NiJ9.NDM4OA.KC0mmLOUOMxB2L6UmXRn4j_f5-TztD4QR563tcdbF1Y'
    },
    'new': true
  }
  const session = new Session(json)
  session.clear('color')

  t.falsy(session.get('color'))
})

test(`clear()`, t => {
  const json = {
    'sessionId': 'SessionId.427810be-cf30-4314-88e9-dbf3cb9066a7',
    'application': {
      'applicationId': 'amzn1.echo-sdk-ams.app.4066aa4b-bc05-4a41-af1a-ab03bc977e10'
    },
    'attributes': {
      'color': 'blue'
    },
    'user': {
      'userId': 'amzn1.ask.account.AHZDSK3PNL34ROYLZNSRNNXN5GAB5UGADZLKCYSTGP5W7UHMRXSFVD6NYC2E6W3LFBMQQUZLQF6CWP5IQ3EAHYJ5YH3GWIXV6TOAS4CJ5NH62RKWRFVKIH7MYT5E65VXILVPDVLEJYN2KECDSYHITA4QWZPIY6J7SZVL7Z3MZT23X6GG63FPXKAS645FCQ232HU3QENZW2LB3RA',
      'accessToken': 'eyJhbGciOiJIUzI1NiJ9.NDM4OA.KC0mmLOUOMxB2L6UmXRn4j_f5-TztD4QR563tcdbF1Y'
    },
    'new': true
  }
  const session = new Session(json)
  session.clear()

  t.deepEqual(session.getAttributes(), {})
})

test(`id(): string`, t => {
  const json = {
    'sessionId': 'SessionId.427810be-cf30-4314-88e9-dbf3cb9066a7',
    'application': {
      'applicationId': 'amzn1.echo-sdk-ams.app.4066aa4b-bc05-4a41-af1a-ab03bc977e10'
    },
    'attributes': {
      'color': 'blue'
    },
    'user': {
      'userId': 'amzn1.ask.account.AHZDSK3PNL34ROYLZNSRNNXN5GAB5UGADZLKCYSTGP5W7UHMRXSFVD6NYC2E6W3LFBMQQUZLQF6CWP5IQ3EAHYJ5YH3GWIXV6TOAS4CJ5NH62RKWRFVKIH7MYT5E65VXILVPDVLEJYN2KECDSYHITA4QWZPIY6J7SZVL7Z3MZT23X6GG63FPXKAS645FCQ232HU3QENZW2LB3RA',
      'accessToken': 'eyJhbGciOiJIUzI1NiJ9.NDM4OA.KC0mmLOUOMxB2L6UmXRn4j_f5-TztD4QR563tcdbF1Y'
    },
    'new': true
  }
  const session = new Session(json)

  t.is(session.id(), 'SessionId.427810be-cf30-4314-88e9-dbf3cb9066a7')
})

test(`isNew(): true`, t => {
  const json = {
    'sessionId': 'SessionId.427810be-cf30-4314-88e9-dbf3cb9066a7',
    'application': {
      'applicationId': 'amzn1.echo-sdk-ams.app.4066aa4b-bc05-4a41-af1a-ab03bc977e10'
    },
    'attributes': {
      'color': 'blue'
    },
    'user': {
      'userId': 'amzn1.ask.account.AHZDSK3PNL34ROYLZNSRNNXN5GAB5UGADZLKCYSTGP5W7UHMRXSFVD6NYC2E6W3LFBMQQUZLQF6CWP5IQ3EAHYJ5YH3GWIXV6TOAS4CJ5NH62RKWRFVKIH7MYT5E65VXILVPDVLEJYN2KECDSYHITA4QWZPIY6J7SZVL7Z3MZT23X6GG63FPXKAS645FCQ232HU3QENZW2LB3RA',
      'accessToken': 'eyJhbGciOiJIUzI1NiJ9.NDM4OA.KC0mmLOUOMxB2L6UmXRn4j_f5-TztD4QR563tcdbF1Y'
    },
    'new': true
  }
  const session = new Session(json)

  t.is(session.isNew(), true)
})

test(`isNew(): false`, t => {
  const json = {
    'sessionId': 'SessionId.427810be-cf30-4314-88e9-dbf3cb9066a7',
    'application': {
      'applicationId': 'amzn1.echo-sdk-ams.app.4066aa4b-bc05-4a41-af1a-ab03bc977e10'
    },
    'attributes': {
      'color': 'blue'
    },
    'user': {
      'userId': 'amzn1.ask.account.AHZDSK3PNL34ROYLZNSRNNXN5GAB5UGADZLKCYSTGP5W7UHMRXSFVD6NYC2E6W3LFBMQQUZLQF6CWP5IQ3EAHYJ5YH3GWIXV6TOAS4CJ5NH62RKWRFVKIH7MYT5E65VXILVPDVLEJYN2KECDSYHITA4QWZPIY6J7SZVL7Z3MZT23X6GG63FPXKAS645FCQ232HU3QENZW2LB3RA',
      'accessToken': 'eyJhbGciOiJIUzI1NiJ9.NDM4OA.KC0mmLOUOMxB2L6UmXRn4j_f5-TztD4QR563tcdbF1Y'
    },
    'new': false
  }
  const session = new Session(json)

  t.is(session.isNew(), false)
})
