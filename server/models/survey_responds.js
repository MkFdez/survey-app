const mongoose = require('mongoose')

const surveyRespondSchema = new mongoose.Schema({
    surveyId: String,
    response: Object,
  })
  surveyRespondSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })
  const SurveyRespond = mongoose.model('Response', surveyRespondSchema)
  module.exports = SurveyRespond
