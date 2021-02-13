import axios from 'axios'
import { Dispatch } from 'redux'

import {
  FETCH_AGENT_REQUEST,
  FETCH_AGENT_FAILURE,
  FETCH_AGENT_SUCCESS,
  AgentActions,
  Agent,
} from '../../Types/AgentType'

export const fetchAgentRequest = () => {
  return {
    type: FETCH_AGENT_REQUEST,
  }
}

export const fetchAgentSuccess = (agent: Agent[]) => {
  return {
    type: FETCH_AGENT_SUCCESS,
    payload: agent,
  }
}

export const fetchAgentFailure = (error: any): AgentActions => {
  return {
    type: FETCH_AGENT_FAILURE,
    payload: error,
  }
}

export const fetchAgents = () => {
  return (dispatch: Dispatch) => {
    dispatch(fetchAgentRequest())
    axios
      .get('http://localhost:8000/api/v1/agent')
      .then((response) => {
        const agents = response.data
        console.log('agents response', agents)
        dispatch(fetchAgentSuccess(agents))
      })
      .catch((error) => {
        dispatch(fetchAgentFailure(error.message))
      })
  }
}
