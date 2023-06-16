import { createSlice } from '@reduxjs/toolkit'

export const createSurveySlice = createSlice({
  name: 'createSurvey',
  initialState: [{q : "", pa : [{a:"", t:0}, {a:"", t:0}], m:false, t:1}]
  ,
  reducers: {
    addQuestion: (state, action)  =>{
        [...state, action.payload]
    },
    updateQuestionData: (state, {payload}) =>{
        state.map((y,index) => (index != payload.i ? y : {...y,pa : y.pa.map((z,ind) => payload.questionIndex != ind ? z : {...z, a:payload.d})}))
    },
    removeQuestion: (state, action) =>{
        state.filter((y, index) => index != action.payload)
    },
    updateQuestion: (state, {payload}) => {
        state.map((y,i) => i != payload.index ? y : {...y, q:payload.newValue} )
    },
    addAnswer: (state, {payload}) => {
        state.map((y,index) => payload.i != index ? y  : {...y, pa: [...y.pa, payload.d]} )
    } 
  }
}
)
export const { addQuestion, updateQuestion, updateQuestionData, addAnswer, removeQuestion } = createSurveySlice.actions

export default createSurveySlice.reducer