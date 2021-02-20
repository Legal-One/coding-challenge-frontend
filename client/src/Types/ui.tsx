import { Logs } from './LogsType'
import { Resolution } from './ResolutionType'
import { Agent } from './AgentType'

export type AgentProps = {
  agent: Agent
}

export type AgentTableDataProps = {
  handleFindAgent: Function
  log: Logs
}

export type LogsTableDataProps = {
  handleGetCallsByAgentId: Function
  log: Logs
}

export type LogProps = {
  logs: Logs[] | any
}

export type ParamsProps = {
  identifier : string
}
