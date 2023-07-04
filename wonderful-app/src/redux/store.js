import { configureStore } from '@reduxjs/toolkit'
import createSurveyReducer from './createSurvey'
import surveyReducer from './survey'
import playerReducer from './player'
export default configureStore({
  reducer: {
    createSurvey: createSurveyReducer,
    survey: surveyReducer,
    player: playerReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})