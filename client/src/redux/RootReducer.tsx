import { combineReducers } from 'redux'

import AgentReducers from './reducers/AgentReducer'
import LogsReducers from './reducers/LogsReducer'

const rootReducer = combineReducers({
  agents: AgentReducers,
  logs: LogsReducers,
})

export default rootReducer
