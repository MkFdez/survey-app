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
const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/checkToken', checkRouter)
app.use('/api/uploads', uploadRouter)
app.use('/api/survey', surveyRouter)
app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));


app.get('/api', (req, res) => {
    res.json({"users": 'users'})

})

app.listen(5000, () => {console.log("server started on port 5000")})
module.exports = app;