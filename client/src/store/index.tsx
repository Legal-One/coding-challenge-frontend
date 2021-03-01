import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import callCenterReducer from '../features/callcenter/callcenter-slice'
const store = configureStore({
  reducer: {
    callCenter: callCenterReducer
  }
})

export default store

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
