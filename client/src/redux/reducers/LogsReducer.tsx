import {
  FETCH_LOGS_REQUEST,
  FETCH_LOGS_FAILURE,
  FETCH_LOGS_SUCCESS,
  LogsActions,
  LogsState,
} from '../../Types/LogsType'

const initialState: LogsState = {
  loading: false,
  logs: [],
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
    return {
      ...state,
      loading: false,
      logs: action.payload,
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
