import test from 'ava'
const Card = require('../src/card')
const Alexa = require('../src/alexa')

test(`simple card`, t => {
  const card = new Card('title', 'body')

  const expected = {
    type: Alexa.CardType.Simple,
    title: 'title',
    content: 'body'
  }

  t.deepEqual(card.format(), expected)
})

test(`standard card`, t => {
  const card = new Card('title', 'body', ['img1', 'img2'])

  const expected = {
    type: Alexa.CardType.Standard,
    title: 'title',
    text: 'body',
    image: {
      smallImageUrl: 'img1',
      largeImageUrl: 'img2'
    }
  }

  t.deepEqual(card.format(), expected)
})

test(`link account`, t => {
  const card = new Card().linkAccount()

  const expected = {
    type: Alexa.CardType.LinkAccount
  }

  t.deepEqual(card, expected)
})
