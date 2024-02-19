const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const DataAccess = require('../mongo')
const jwt = require('jsonwebtoken')
const getTokenFrom = require('../utils/gtfr')

usersRouter.post('/', async (request, response) => {
  console.log('we got it to register')
  const { username, email, password, picture } = request.body
  console.log(username)
  let value = await DataAccess.checkUser(username, email)
  if(value != 0){
    let message = 'username' 
    return response.status(400).json({ error: `${message} already exists` })
  }
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    email,
    passwordHash,
    picture,
  })
  const savedUser = await user.save()
  
  response.status(201).json(savedUser)
})

usersRouter.get('/surveys', async (req, res) =>{
    const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)
    if (!decodedToken.id) {
        return res.status(401).json({ error: 'token invalid' })
    }  
    let surveys = await DataAccess.getUserSurveys(decodedToken.id)
    res.json(surveys)
})
module.exports = usersRouter