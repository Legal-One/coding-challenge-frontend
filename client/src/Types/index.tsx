import { AgentState } from './AgentType'
import { LogsState } from './LogsType'

export type AppState = {
  agents: AgentState
  logs: LogsState
}
