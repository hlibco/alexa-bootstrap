const Alexa = require('./alexa')

class Card {
  constructor (title, text, images, meta, options) {
    this.data = {}
    if (images) {
      const uri = options.storage || ''
      this.type(Alexa.CardType.Standard)
      this.data.text = text
      this.data.image = {
        smallImageUrl: images && images[0],
        largeImageUrl: images && images[1]
      }

      if (this.data.image.smallImageUrl.substr(0, 8) !== 'https://') {
        this.data.image.smallImageUrl = uri + this.data.image.smallImageUrl
      }
      if (this.data.image.largeImageUrl.substr(0, 8) !== 'https://') {
        this.data.image.largeImageUrl = uri + this.data.image.largeImageUrl
      }
    } else if (title) {
      this.type(Alexa.CardType.Simple)
      this.data.title = title
      this.data.content = this.text
    }
  }

  type (t) {
    this.data.type = t
    return this
  }

  format () {
    return this.data
  }
}

module.exports = Card
