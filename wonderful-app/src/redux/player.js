import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'player',
  initialState: {
    volumenDisplay: false
  },
  reducers: {
    changeVolDisplay: state => {
      state.volumenDisplay = !state.volumenDisplay
    },
    
  }
})

// Action creators are generated for each case reducer function
export const { changeVolDisplay } = counterSlice.actions

export default counterSlice.reducer