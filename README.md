# alexa-bootstrap
---

![build](https://github.com/hlibco/alexa-bootstrap/badges/master/build.svg)

![coverage](https://github.com/hlibco/alexa-bootstrap/badges/master/coverage.svg?job=test)

[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

---

## Installation

> yarn add alexa-bootstrap
or
> npm i alexa-bootstrap

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

*storage* - used by StandardCard while generating the images urls
*applicationId* - if present, it will block requests with different applicationId
*shouldEndSession* - set the default behavior for response (default: false)

---

## Intent Example

```
alexa.intent('Booking', (req, res) => {
  Debug('Run BookingIntent')

  const meta = {vehicle: 'car', city: {name: 'San Francisco'}}

  res.say('Your {vehicle} is in {city.name}.', meta)
  .card('Your status is {status}', 'some text...', ['url 1', 'url 2'], {status: 'Pending'})
  .repeat('Do you want me to rent a car in {city}', {city: 'Palo Alto'})
  .reprompt('I cant hear you. What do you want?')
})
```

---

## Hooks
- .pre((req, res) => {})
- .post((req, res) => {})

#### .pre((req, res) => {})
It runs before every request.

```
alexa.pre((req, res) => {
  console.log('Pre request')
})
```


#### .post((req, res) => {})
It runs after every request.

```
alexa.post((req, res) => {
  console.log('Post request')
})
```

---

## Request Types
- .launch((req, res) => {})
- .SessionEnded((req, res) => {})
- .intent(name, (req, res) => {})

#### .launch((req, res) => {})
The user invokes the skill but doesn't map to any specific intent.

```
alexa.launch((req, res) => {
  console.log('LaunchIntent')
})
```

#### .SessionEnded(req, res)
The session is ended by Alexa. For example, when the user doesn't respond for some seconds.

```
alexa.SessionEnded((req, res) => {
  console.log('SessionEnded')
})
```

#### .intent(name, (req, res) => {})
The user has a clear intent to perform an action.

```
alexa.intent('Booking', (req, res) => {
  console.log('This is the Booking Intent')
})
```

---

## Response

- .say(ssml, vars)
- .reprompt(ssml, vars)
- .card(title, body, imageUrls, vars)
- .linkAccount()
- .abort()
- .end()
- .tag(code)
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
- `imageUrls`: string || array of strings (optional)
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
You can abort the request in the .pre() hook if it doesn't match your business rules. However, the .post() hook will be executed.
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
// Step 1
alexa.intent('Restaurant', (req, res) => {
  res.say('Do you want to confirm your reservation?').tag('confirm_reservation')
})

// Step 2
alexa.intent('AMAZON.YesIntent', (req, res) => {
  if (req.tag('confirm_reservation')) {
    res.say('Ok. Your reservation is confirmed.')  
  }
})
```

---

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

### Todo

- Add support for AudioPlayer
- Add support for PlaybackController
