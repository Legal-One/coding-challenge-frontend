import { combineReducers } from 'redux'
import AgentReducers from './reducers/AgentReducer'

const rootReducer = combineReducers({
  agent: AgentReducers,
})

export default rootReducer
