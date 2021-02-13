import { AgentState } from './AgentType'
import { LogsState } from './LogsType'
import { ResolutionState } from './ResolutionType'
export type AppState = {
  agents: AgentState
  logs: LogsState
  resolution: ResolutionState
}
