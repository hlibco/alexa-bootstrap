import test from 'ava'
const App = require('../src/index')

test(`pre(func)`, t => {
  const app = new App()
  app.pre(() => {})

  t.not(app.preFunction, null)
})

test(`pre()`, t => {
  const app = new App()
  app.pre()

  t.is(app.preFunction, null)
})

test(`post(func)`, t => {
  const app = new App()
  app.post(() => {})

  t.not(app.postFunction, null)
})

test(`post()`, t => {
  const app = new App()
  app.post()

  t.is(app.postFunction, null)
})

test(`launch(func)`, t => {
  const app = new App()
  app.launch(() => {})

  t.not(app.launchFunction, null)
})

test(`launch()`, t => {
  const app = new App()
  app.launch()

  t.is(app.launchFunction, null)
})

test(`sessionEnded(func)`, t => {
  const app = new App()
  app.sessionEnded(() => {})

  t.not(app.sessionEndedFunction, null)
})

test(`sessionEnded()`, t => {
  const app = new App()
  app.sessionEnded()

  t.is(app.sessionEndedFunction, null)
})

test(`intent(func)`, t => {
  const app = new App()
  app.intent('Confirmation', () => {})

  t.truthy(app.intents.Confirmation)
})

test(`intent()`, t => {
  const app = new App()
  app.intent('Confirmation')

  t.deepEqual(app.intents, {})
})
