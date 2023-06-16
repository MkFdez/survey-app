
const Survey = require('../models/survey')
const User = require('../models/user')

const initialSurveys = [
  {
    title: 'HTML is easy',
    public: false
  },
  {
    title: 'Browser can execute only JavaScript',
    public: true
  }
]

const nonExistingId = async () => {
  const survey = new Survey({ title: 'willremovethissoon' })
  await survey.save()
  await survey.remove()

  return survey._id.toString()
}

const surveyInDb = async () => {
  const survey = await Survey.find({})
  return survey.map(note => note.toJSON())
}

const usersInDb = async () => {

  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
    initialSurveys,
  nonExistingId,
  surveyInDb,
  usersInDb,
}