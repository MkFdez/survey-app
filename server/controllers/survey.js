const surveyRouter = require('express').Router()
const getTokenFrom = require('../utils/gtfr')
const jwt = require('jsonwebtoken');
const DataAccess = require("../mongo")
surveyRouter.post('/', async (req,res) => {
    const body = req.body
    const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)
    if (!decodedToken.id) {
        return res.status(401).json({ error: 'token invalid' })
    }
    let data = req.body
    let id = await DataAccess.addSurvey(data, decodedToken.id) 
    res.json({id:id})
})

surveyRouter.get('/', async (req,res)=>{
  
    let id = req.query.id
    let response = await DataAccess.getSurvey(id)
    res.json(response)
})
surveyRouter.post('/finish', (req,res)=>{
    let surveyId = req.body.surveyId
    let response = req.body.response
    let ip = req.body.ip
    DataAccess.addResponse(response,surveyId, ip)
})

surveyRouter.get('/info', async (req, res)=>{
    let surveyId = req.query.surveyId
    let data = await DataAccess.getResponses(surveyId)
    let moreData = await DataAccess.getSurveyLite(surveyId)
    
    res.json({responses: data, moreData})
})
surveyRouter.get('/checkIp', async(req, res) => {
    let surveyId = req.query.id
    let ip = req.query.ip
    let result = await DataAccess.checkIp(surveyId, ip)

    res.json({exist : result})
})


module.exports = surveyRouter