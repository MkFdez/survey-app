const allowedOrigins = require('./allowedOrigins')

const corsOptions = function (req, callback) {
    var corsOptions;
    console.log(req.header('Origin'))
    if (allowedOrigins.indexOf(req.header('Origin')) !== -1) {
      corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
    } else {
      corsOptions = { origin: false } // disable CORS for this request
    }
    callback(null, corsOptions) // callback expects two parameters: error and options
  }

module.exports = corsOptions 