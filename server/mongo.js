const mongoose = require('mongoose')
require('dotenv').config()

const url = process.env.MONGO_URL
mongoose.set('strictQuery',false)
mongoose.connect(url).then(result => {
  console.log('connected to MongoDB')
})
.catch((error) => {
  console.log('error connecting to MongoDB:', error.message)
})


const Survey = require('./models/survey')
const User = require('./models/user') 
const SurveyRespond = require('./models/survey_responds')


class DataAccess{
  static async addSurvey(data, id) {
    const q = new Survey({
      questions : data.questions,
      title: data.title,
      public: true,
      date: Date.now(),
      owner: id,
    })
    await q.save()
    const user = await User.findById(id)
    user.surveys = [...user.surveys, q.id]
    await user.save()
    return q.id
  }

   static async getSurvey(surveyId){
    let data = new Object()
    await Survey.findById(surveyId).populate({
      path: "owner",
      select: "username -_id" // Include username field and exclude _id field
    }).then((result) => {
      data = result})
    return data
}

  static async addResponse(response, surveyId, ip){
    const res = new SurveyRespond({
      surveyId: surveyId,
      response : response,
      date: new Date(),
    })
    const survey =await Survey.findById(surveyId)
    await res.save()
    if(survey.responses){
    survey.responses = [...survey.responses, res.id]
    }else{
      survey.responses = [res.id]
    }
    if(survey.usedIps){
      survey.usedIps = [...survey.usedIps, ip]
    }else{
      survey.usedIps = [ip]
    }
    await survey.save()
  } 
  static async getResponses(surveyId){
    let data = new Object()
    await SurveyRespond.find({surveyId: surveyId}).then((result) => {
      data = result
     
  })
  return data
}

static async getUserSurveys(id){
  const data = await User.findById(id).populate({path:'surveys', select:'-questions -owner'}).select("surveys -_id")
  return data

}
static async getSurveyLite(id){
  const data = await Survey.findById(id).select('-owner -responses')
  return data
}
static async checkIp(id, ip){
  const survey = await Survey.findById(id).select('usedIps')
  const result = survey.usedIps.some(x => x == ip)
  return result
}
}


module.exports = DataAccess