import { configureStore } from '@reduxjs/toolkit'
import createSurveyReducer from './createSurvey'
import surveyReducer from './survey'
export default configureStore({
  reducer: {
    createSurvey: createSurveyReducer,
    survey: surveyReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})