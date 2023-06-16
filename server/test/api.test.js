const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../server')
const bcrypt = require('bcrypt')
const helper = require('./test_helper')
const User = require('../models/user')
const api = supertest(app)

test('survey are returned as json', async () => {
  await api
    .get('/api/survey', {params : {surveyId: '646ec9cbceadf7ea86d0eae3'}})
    .expect(200)
    .expect('Content-Type', /application\/json/)
})
describe('when there is initially one user in db', () => {
beforeEach(async () => {
  await User.deleteMany({})
  
  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root', passwordHash })

  await user.save()
})

test('creation succeeds with a fresh username', async () => {
  const usersAtStart = await helper.usersInDb()

  const newUser = {
    username: 'mluukkai',
    email: 'lks@gmail.com',
    password: 'salainen',
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const usersAtEnd = await helper.usersInDb()
  expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

  const usernames = usersAtEnd.map(u => u.username)
  expect(usernames).toContain(newUser.username)
})
})

afterAll(() => {
  mongoose.connection.close()
})