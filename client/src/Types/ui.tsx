import { Logs } from './LogsType'
import { Resolution } from './ResolutionType'
import { Agent } from './AgentType'

export type AgentProps = {
  agent: Agent
}

export type TableRowProps = {
  agents: Agent[]
}

export type MainTableProps = {
  agent: Agent
}
