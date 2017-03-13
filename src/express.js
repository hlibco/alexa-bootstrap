// attach Alexa endpoint to an express router
//
// @param object options.expressApp the express instance to attach to
// @param router options.router router instance to attach to the express app
// @param string options.endpoint the path to attach the router to (e.g., passing 'mine' attaches to '/mine')
// @param bool options.checkCert when true, applies Alexa certificate checking (default true)
// @param bool options.debug when true, sets up the route to handle GET requests (default false)
// @param function options.preRequest function to execute before every POST
// @param function options.postRequest function to execute after every POST
// @throws Error when router or expressApp options are not specified
// @returns this
module.exports = options => {
  if (!options.expressApp && !options.router) {
    throw new Error('You must specify an express app or an express router to attach to.')
  }

  var defaultOptions = { endpoint: '/' + self.name, checkCert: true, debug: false }

  options = defaults(options, defaultOptions)

  // In ExpressJS, user specifies their paths without the '/' prefix
  var deprecated = options.expressApp && options.router
  var endpoint = deprecated ? '/' : normalizeApiPath(options.endpoint)
  var target = deprecated ? options.router : (options.expressApp || options.router)

  if (deprecated) {
    options.expressApp.use(normalizeApiPath(options.endpoint), options.router)
    // console.warn('Usage deprecated: Both 'expressApp' and 'router' are specified.\nMore details on https://github.com/alexa-js/alexa-app/blob/master/UPGRADING.md')
  }

  if (options.debug) {
    target.get(endpoint, function(req, res) {
      if (typeof req.query['schema'] != 'undefined') {
        res.set('Content-Type', 'text/plain').send(self.schema())
      } else if (typeof req.query['utterances'] != 'undefined') {
        res.set('Content-Type', 'text/plain').send(self.utterances())
      } else {
        res.render('test', {
          'app': self,
          'schema': self.schema(),
          'utterances': self.utterances()
        })
      }
    })
  }

  if (options.checkCert) {
    target.use(endpoint, verifier)
  } else {
    target.use(endpoint, bodyParser.json())
  }

  // exposes POST /<endpoint> route
  target.post(endpoint, function(req, res) {
    var json = req.body,
      response_json
    // preRequest and postRequest may return altered request JSON, or undefined, or a Promise
    Promise.resolve(typeof options.preRequest == 'function' ? options.preRequest(json, req, res) : json)
      .then(function(json_new) {
        if (json_new) {
          json = json_new
        }
        return json
      })
      .then(self.request)
      .then(function(app_response_json) {
        response_json = app_response_json
        return Promise.resolve(typeof options.postRequest == 'function' ? options.postRequest(app_response_json, req, res) : app_response_json)
      })
      .then(function(response_json_new) {
        response_json = response_json_new || response_json
        res.json(response_json).send()
      })
      .catch(function(err) {
        console.error(err)
        res.status(500).send('Server Error')
      })
  })

}
