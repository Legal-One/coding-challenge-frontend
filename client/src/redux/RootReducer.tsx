import { combineReducers } from 'redux'
import AgentReducers from './reducers/AgentReducer'

const rootReducer = combineReducers({
  agents: AgentReducers,
})

export default rootReducer
