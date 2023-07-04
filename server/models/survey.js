const mongoose = require('mongoose')
const surveySchema = new mongoose.Schema({
    title:String,
    subtitle:String,
    imageSubtitle:String,
    question: Array,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    responses:Array,
    usedIps: Array,
    date: Date,
    public: Boolean,
    
  })
  surveySchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })
  
  const Survey = mongoose.model('Survey', surveySchema)
  module.exports = Survey