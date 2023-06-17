import { createSlice } from '@reduxjs/toolkit'
import generateGUID from '../../utils/guid'

export const createSurveySlice = createSlice({
  name: 'createSurvey',
  initialState: {
    questions: [{q : "", pa : [{a:"", t:0}, {a:"", t:0}], m:false, t:1}], 
    title: '',
    isloading: true,
    imageFolder: generateGUID()

  }
  ,
  reducers: {
    addQuestion: (state, action)  =>{
       state.questions = [...state.questions, action.payload]
    },
    updateQuestionData: (state, {payload}) =>{
       state.questions = state.questions.map((y,index) => (index != payload.i ? y : {...y,pa : y.pa.map((z,ind) => payload.questionIndex != ind ? z : {...z, a:payload.d})}))
    },
    removeQuestion: (state, action) =>{
        state.questions = state.questions.filter((y, index) => index != action.payload)
    },
    updateQuestion: (state, {payload}) => {
       state.questions = state.questions.map((y,i) => i != payload.index ? y : {...y, q:payload.newValue} )
    },
    addAnswer: (state, {payload}) => {
        state.questions = state.questions.map((y,index) => payload.i != index ? y  : {...y, pa: [...y.pa, payload.d]} )
    },
    updateTitle: (state, {payload}) => {
        state.title = payload
    },
    setLoadingFalse: (state) => {
      state.isloading = false
    },
    reset : (state) => {
      state = {
        questions: [{q : "", pa : [{a:"", t:0}, {a:"", t:0}], m:false, t:1}], 
        title: '',
        isloading: true,
        imageFolder: generateGUID()
    
      }
    }
  }
}
)
export const { addQuestion, updateQuestion, updateQuestionData, addAnswer, removeQuestion, reset, updateTitle, setLoadingFalse } = createSurveySlice.actions

export default createSurveySlice.reducer