import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import RootReducer from './RootReducer'

const store = createStore(
  RootReducer,
  composeWithDevTools(applyMiddleware(thunk))
)

export default store
