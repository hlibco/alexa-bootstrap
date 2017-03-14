# alexa-bootstrap

[![Build Status](https://travis-ci.org/hlibco/alexa-bootstrap.svg?branch=master)](https://travis-ci.org/hlibco/alexa-bootstrap) [![Coverage Status](https://coveralls.io/repos/github/hlibco/alexa-bootstrap/badge.svg)](https://coveralls.io/github/hlibco/alexa-bootstrap) [![Standard - JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/) [![node](https://img.shields.io/node/v/alexa-bootstrap.svg)]() [![npm](https://img.shields.io/npm/v/alexa-bootstrap.svg)]() [![npm](https://img.shields.io/npm/l/alexa-bootstrap.svg)]()
---

## Installation

`yarn add alexa-bootstrap` or `npm i alexa-bootstrap`

---

## Settings

All settings are optional.

```
const Alexa = require('alexa-bootstrap')

const alexa = new Alexa({
  storage: 'https://s3....',
  applicationId: 'amzn1.echo-sdk-ams.app...',
  shouldEndSession: false
})
```

- `storage` - used by StandardCard while generating the images urls
- `applicationId` - it's the applicationId displayed on the Developer Console > Alexa. If present, it will block requests with different applicationId
- `shouldEndSession` - define if the session should be ended after each response (default: false)

---

## Intent Example

```
alexa.intent('Booking', (req, res) => {
  const meta = {vehicle: 'car', city: {name: 'San Francisco'}}

  res.say('Your {vehicle} is in {city.name}. Do you confirm?', meta)
  .reprompt('I cant hear you. Say yes or no.')
})
```

---

## Example using Express
Your Express setup might be more robust than the one below. It's a good practice to split the code below into files such as: server, routes and skills/intents.

```
const Alexa = require('alexa-bootstrap')
const Express = require('express')
const BodyParser = require('body-parser')

const port = process.env.PORT || 8080
const alexa = new Alexa()
const router = Express.Router()
const express = Express()

/**
 * Setup webserver
 */
express.set('port', port)

/**
 * Setup middlewares
 */
express.use(BodyParser.urlencoded({ extended: true }))
express.use(BodyParser.json())


/**
 * Setup Alexa Skill
 */
alexa.pre((req, res) => {
  res.session().set('city', 'New York')
})

alexa.launch((req, res) => {
  console.log('Launch Intent')
})

alexa.intent('Food', (req, res) => {
  res.say('Do you want to order {food}?', {food: 'pizza'})
})

/**
 * Endpoint used by Alexa (POST) - setup in the Amazon Developer Console
 * Change it to a name that best suits your needs.
 */
router.post('/skill', (req, res) => {
  alexa.request(req.body).then(response => {
    res.json(response)
  }, response => {
    res.status(500).send('Server Error')
  })
})

/**
 * Setup the router middleware
 */
express.use('/', router)

/**
 * Start server
 * Webhooks must be available via SSL with a certificate signed by a valid
 * certificate authority. Use Ngrok or similar for development.
 */
express.listen(port, () => {
  console.log(`Alexa app is running on port ${port}`)
})

```

---

## Pre / Post Request Hooks
- .pre()
- .post()

#### .pre((req, res) => {})
It runs before every request.

```
alexa.pre((req, res) => {
  console.log('Pre request')
})
```


#### .post((req, res) => {})
It runs after every request. Even if the request has been aborted using `res.abort()` (more about this later).

```
alexa.post((req, res) => {
  console.log('Post request')
  res.say('Hello, how can I help you?')
})
```

---

## Intents
- .launch()
- .sessionEnded()
- .intent()

#### .launch((req, res) => {})
The user invokes the skill but doesn't map to any specific intent.

```
alexa.launch((req, res) => {
  console.log('LaunchIntent')
})
```

#### .sessionEnded(req, res)
The session is ended by Alexa. For example, when the user doesn't respond for some seconds.

```
alexa.SessionEnded((req, res) => {
  console.log('SessionEnded')
})
```

#### .intent(name, (req, res, slots) => {})
The user has a clear intent to perform an action.

```
alexa.intent('Booking', (req, res, slots) => {
  // Accessing slots...
  console.log('You are going to ' + slots.City)

  // ...It's equivalent to
  console.log('You are going to ' + req.slot('City'))

  // Using default values to slots
  console.log('You are going to ' + req.slot('City', '... Hmm, which city?'))
})
```

---

## Response

- .say()
- .reprompt()
- .card()
- .linkAccount()
- .abort()
- .end()
- .tag()
- .session()

#### .say(ssml, vars)
```
alexa.intent('Hotel', (req, res) => {
  res.say('I love {city}', {city: 'London'})

  // You can add SSML tags
  res.say('Hmm. <break time="1s" /> I love {city}', {city: 'London'})
})
```

#### .reprompt(ssml, vars)
```
alexa.intent('Food', (req, res) => {
  res.say('Do you want {food}?', {food: 'pizza'})
  .reprompt('Tell me if you want {food}', {food: 'pizza'})
})
```

#### .card(title, body, imageUrls, vars)
- `title`: string (required)
- `body`: string (required)
- `imageUrls`: string or array of strings (optional)
- `vars`: object (optional)
```
alexa.intent('Job', (req, res) => {
  // Add images to the card
  const images = ['url small image', 'url large image']

  res.say('There is a job for you')
  .card('Jobs in {city}', 'There are 50 jobs in {city}', images, {food: 'pizza'})
})
```

#### .linkAccount()
Create a card in the Alexa App where the user can link his Alexa account with his account on your service. This card will display a link to the Login page you have set up in the Alexa Skill Developer Portal.

```
alexa.intent('Account', (req, res) => {
  // Example 1
  // Creates an account linking card
  res.linkAccount()

  // Example 2
  // Validate if user has a token
  if (!req.accessToken()) {
    res.linkAccount()
  }
})
```

#### .abort()
You can abort the request in the .pre() hook if it doesn't match your business rules. However, the `.post()` hook will still be executed.
```
alexa.pre((req, res) => {
  res.abort()
})
```

#### .end()
Ends the session. It sets `shouldEndSession` to `true`.
```
alexa.intent('Restaurant', (req, res) => {
  res.say('Your reservation is confirmed.').end()
})
```

#### .tag(code)
It applies a tag to the response that will be returned in the next request. It's useful to track the conversation.

```
// Request 1
alexa.intent('Restaurant', (req, res) => {
  res.say('Do you want to confirm your reservation?').tag('confirm_reservation')
})

// Request 2
alexa.intent('AMAZON.YesIntent', (req, res) => {
  if (req.tag('confirm_reservation')) {
    res.say('Ok. Your reservation is confirmed.')  
  }
})
```

#### .session()
Returns the session if there is any.

```
alexa.intent('Flight', (req, res) => {
  // Get the session
  const session = res.session()

  // Add values to the session (method 1)
  session.set('from', 'SFO')
  session.set('to', 'JFK')

  // Add values to the session (method 2)
  session.set('from', 'SFO').set('to', 'JFK')

  // Get values from session
  const from = session.get('from')
  const to = session.get('to')

  // Clear session keys
  session.clear('from')

  // Clear entire session
  session.clear()
})
```

---

## Request

- .raw()
- .id()
- .type()
- .timestamp()
- .locale()
- .context()
- .userId()
- .accessToken()
- .applicationId()
- .intent()
- .slot()
- .reason()
- .error()
- .tag()

#### .raw()
Returns the raw request.

#### .id()
Returns the request id.

#### .type()
Returns the request type.

#### .timestamp()
Returns the timestamp.

#### .locale()
Returns the locale.

#### .context()
Returns the context object. Some requests do not have the *context* and will return and empty object.

#### .userId()
Returns the user id. It does the lookup in the `context` and `session` objects.

#### .accessToken()
Returns the user access token. It does the lookup in the `context` and `session` objects.

#### .applicationId()
Returns the application id. It does the lookup in the `context` and `session` objects.

#### .intent()
Returns the intent name.

#### .slot(name, default)
- `name`: optional
- `default`: optional (default value)

#### .reason()
Returns the reason of the error occurred in SessionEndedRequest().

#### .error()
Returns the error occurred in SessionEndedRequest().

#### .tag(name)
- `name`: optional

Returns the tag name or does an assert.

```
alexa.intent('Flight', (req, res) => {
  // Get the tag name
  req.tag()

  // Assert the tag
  if (req.tag('confirm_reservation')) {
    // do something...
  }

})
```

---

### Todo

- Add support for AudioPlayer
- Add support for PlaybackController
