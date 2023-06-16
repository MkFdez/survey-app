import { configureStore } from '@reduxjs/toolkit'
import createSurveyReducer from './createSurvey'
export default configureStore({
  reducer: {
    createSurvey: createSurveyReducer,
  }
})