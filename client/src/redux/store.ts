import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import RootReducer from './RootReducer'

const temp = localStorage.getItem('reduxState')
const persistedState = temp ? JSON.parse(temp) : {}

const store = createStore(
  RootReducer,
  persistedState,
  composeWithDevTools(applyMiddleware(thunk))
)

store.subscribe(() => {
  localStorage.setItem('reduxState', JSON.stringify(store.getState()))
})

export default store
