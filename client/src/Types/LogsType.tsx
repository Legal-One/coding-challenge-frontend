export const FETCH_LOGS_REQUEST = 'FETCH_LOGS_REQUEST'
export const FETCH_LOGS_SUCCESS = 'FETCH_LOGS_SUCCESS'
export const FETCH_LOGS_FAILURE = 'FETCH_LOGS_FAILURE'

export type Logs = {
  _id: string
  identifier: string
  number: string
  dateTime: string
  duration: number
  agentIdentifier: string
}

export type fetchLogsFailure = {
  type: typeof FETCH_LOGS_FAILURE
  payload: {
    logs: Logs
  }
}

export type fetchLogsRequest = {
  type: typeof FETCH_LOGS_REQUEST
  payload: {
    logs: Logs
  }
}

export type fetchLogsSuccess = {
  type: typeof FETCH_LOGS_SUCCESS
  payload: Logs[]
}

export type LogsActions = fetchLogsRequest | fetchLogsFailure | fetchLogsSuccess

export type LogsState = {
  logs: Logs[]
  loading: boolean
  logsGrouped: {
    [id: string]: Logs[]
  }
  error: string
}

export type LogsProps = {
  logs: Logs
}
