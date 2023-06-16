const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: String,
  name: String,
  passwordHash: String,
  picture: String,
  surveys: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Survey'
    }
  ],
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    if(returnedObject._id){
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    }
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User