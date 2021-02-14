import { combineReducers } from 'redux'

import AgentReducers from './reducers/AgentReducer'
import LogsReducers from './reducers/LogsReducer'
import ResolutionReducers from './reducers/ResolutionReducer'

const rootReducer = combineReducers({
  agents: AgentReducers,
  logs: LogsReducers,
  resolution: ResolutionReducers,
})

export default rootReducer
