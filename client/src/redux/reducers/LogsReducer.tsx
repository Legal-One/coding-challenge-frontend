import {
  FETCH_LOGS_REQUEST,
  FETCH_LOGS_FAILURE,
  FETCH_LOGS_SUCCESS,
  LogsActions,
  LogsState,
} from '../../Types/LogsType'
import { groupBy } from '../../utils'

const initialState: LogsState = {
  loading: false,
  logs: [],
  logsGrouped: {},
  error: '',
}

const LogsReducers = (state = initialState, action: LogsActions) => {
  switch (action.type) {
  case FETCH_LOGS_REQUEST:
    return {
      ...state,
      loading: true,
    }
  case FETCH_LOGS_SUCCESS:
    const logsByAgent = groupBy(action.payload, 'agentIdentifier')
    return {
      ...state,
      loading: false,
      logs: action.payload,
      logsGrouped: logsByAgent,
      error: '',
    }
  case FETCH_LOGS_FAILURE:
    return {
      ...state,
      loading: false,
      logs: [],
      error: action.payload,
    }

  default:
    return state
  }
}

export default LogsReducers
