import { createSlice } from '@reduxjs/toolkit'


export const surveySlice = createSlice({
  name: 'createSurvey',
  initialState: {
    answers:[],
    actualPage: 0,
    value: '0',
    survey: {}
  }
  ,
  reducers: {
    setSurvey: (state, {payload}) => {
      state.survey = payload
    },
    start: (state, {payload}) =>{
        let temp = []
                for(let i = 0; i < payload; i++){
                    temp.push(0)
                }
                state.answers = temp
    },
    answer: (state) => {
        state.answers = state.answers.map((y, i) => i== state.actualPage ? state.value : y )
    },
    nextPage: (state) => {
        state.actualPage += 1
    },
    prevPage : (state) => {
      state.actualPage -= 1
    },
    changeValue: (state, {payload}) => {
        state.value = payload
    },
    reset : (state) => {
        state = {
            answers:[],
            actualPage: 0,
            value: 0,
          }
    },

  }})

export const { start, answer, nextPage, prevPage, changeValue,setSurvey, reset } = surveySlice.actions

export default surveySlice.reducer