const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')
const Cookies = require('universal-cookie')
loginRouter.post('/', async (request, response) => {
  console.log('we got it to login')
  const { username, password } = request.body

  const user = await User.findOne({ username })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)
  console.log(`user => ${user} password -> ${password} username -> ${username} isCorrect -> ${passwordCorrect}`)
  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: 60*60*24*30 }) //60s x 60s is  1h, x 24 is 1 day, x 30 is 1 month
  console.log(`created token - ${token}`)
  const cookie = new Cookies()
  response
    .status(200)
    .send({ token, username: user.username, name: user.name, picture: user.picture })
})

module.exports = loginRouter