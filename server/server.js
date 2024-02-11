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
const corsOptions = require("./config/corsOptions")
const PORT = process.env.PORT || 3030;
const app = express()
//app.use(cors(corsOptions));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", CLIENT_ORIGIN);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  res.header("Access-Control-Allow-Credentials", true); 
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  next();
});
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(bodyParser.text())

//app.use(express.json());
//app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

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