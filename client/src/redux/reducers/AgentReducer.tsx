import {
  FETCH_AGENT_REQUEST,
  FETCH_AGENT_FAILURE,
  FETCH_AGENT_SUCCESS,
  AgentActions,
  AgentState,
} from '../../Types/AgentType'

const initialState: AgentState = {
  loading: false,
  agents: [],
  error: '',
}

const AgentReducers = (state = initialState, action: AgentActions) => {
  switch (action.type) {
  case FETCH_AGENT_REQUEST:
    return {
      ...state,
      loading: true,
    }
  case FETCH_AGENT_SUCCESS:
    return {
      ...state,
      loading: false,
      agents: action.payload,
      error: '',
    }
  case FETCH_AGENT_FAILURE:
    return {
      ...state,
      loading: false,
      agents: [],
      error: action.payload,
    }

  default:
    return state
  }
}

export default AgentReducers
