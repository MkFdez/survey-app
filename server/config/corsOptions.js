const allowedOrigins = require('./allowedOrigins')

const corsOptions = {
    origin: (origin, callback) => {
        console.log(`origin-${origin}`)
        if (true) {
            callback(null, true)
        } else {            
            callback(new Error(`Not allowed by CORS--${origin}`))
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
}

module.exports = corsOptions 