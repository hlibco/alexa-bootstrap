import test from 'ava'
const App = require('../src/index')

test(`pre()`, t => {
  const app = new App()
  app.pre(() => {})

  t.not(app.preFunction, null)
})

test(`post()`, t => {
  const app = new App()
  app.post(() => {})

  t.not(app.postFunction, null)
})

test(`launch()`, t => {
  const app = new App()
  app.launch(() => {})

  t.not(app.launchFunction, null)
})

test(`sessionEnded()`, t => {
  const app = new App()
  app.sessionEnded(() => {})

  t.not(app.sessionEndedFunction, null)
})

test(`intent()`, t => {
  const app = new App()
  app.intent('Confirmation', () => {})

  t.truthy(app.intents.Confirmation)
})
