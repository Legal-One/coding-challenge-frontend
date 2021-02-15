export const FETCH_AGENT_REQUEST = 'FETCH_AGENT_REQUEST'
export const FETCH_AGENT_SUCCESS = 'FETCH_AGENT_SUCCESS'
export const FETCH_AGENT_FAILURE = 'FETCH_AGENT_FAILURE'

export type Agent = {
  _id: string
  identifier: string
  firstName: string
  lastName: string
  email: string
  photo: string
}

export type fetchAgentFailure = {
  type: typeof FETCH_AGENT_FAILURE
  payload: {
    agent: Agent
  }
}

export type fetchAgentRequest = {
  type: typeof FETCH_AGENT_REQUEST
  payload: {
    agent: Agent
  }
}

export type fetchAgentSuccess = {
  type: typeof FETCH_AGENT_SUCCESS
  payload: {
    agent: Agent
  }
}

export type AgentActions =
  | fetchAgentRequest
  | fetchAgentFailure
  | fetchAgentSuccess

export type AgentState = {
  agents: Agent[] | any
  loading: boolean
  error: string
}




