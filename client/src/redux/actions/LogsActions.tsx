import axios from 'axios'
import { Dispatch } from 'redux'

import {
  FETCH_LOGS_REQUEST,
  FETCH_LOGS_FAILURE,
  FETCH_LOGS_SUCCESS,
  LogsActions,
  Logs,
} from '../../Types/LogsType'

export const fetchLogsRequest = () => {
  return {
    type: FETCH_LOGS_REQUEST,
  }
}

export const fetchLogsSuccess = (logs: Logs[]) => {
  return {
    type: FETCH_LOGS_SUCCESS,
    payload: logs,
  }
}

export const fetchLogsFailure = (error: any): LogsActions => {
  return {
    type: FETCH_LOGS_FAILURE,
    payload: error,
  }
}

export const fetchLogs = () => {
  return (dispatch: Dispatch) => {
    dispatch(fetchLogsRequest())
    axios
      .get('http://localhost:8000/api/v1/logs')
      .then((response) => {
        const logs = response.data
        dispatch(fetchLogsSuccess(logs))
      })
      .catch((error) => {
        dispatch(fetchLogsFailure(error.message))
      })
  }
}
