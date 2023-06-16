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
    DataAccess.addResponse(response,surveyId)
})

surveyRouter.get('/info', async (req, res)=>{
    let surveyId = req.query.surveyId
    let data = await DataAccess.getResponses(surveyId)
    res.json(data)
})

module.exports = surveyRouter