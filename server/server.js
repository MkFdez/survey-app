const DataAccess = require("./mongo")
const express = require("express")
var cors = require('cors')
const multer = require('multer');
const path = require('path');
const fs = require('fs')
var bodyParser = require('body-parser')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const checkRouter = require('./controllers/checkToken')
const uploadRouter = require('./controllers/upload')
const surveyRouter = require('./controllers/survey')
const corsOptions = require('./config/corsOptions')
const PORT = process.env.PORT || 3030
const app = express()
app.use(bodyParser.json())

app.use(cors(corsOptions))

app.use(express.json())

app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/checkToken', checkRouter)
app.use('/upload', uploadRouter)
app.use('/api/survey', surveyRouter)


app.get('/api', (req, res) => {
    res.json({"users": 'users'})

})

app.listen(PORT, () => {console.log("server started on port 5000")})
module.exports = app;