export const FETCH_RESOLUTION_REQUEST = 'FETCH_RESOLUTION_REQUEST'
export const FETCH_RESOLUTION_SUCCESS = 'FETCH_RESOLUTION_SUCCESS'
export const FETCH_RESOLUTION_FAILURE = 'FETCH_RESOLUTION_FAILURE'

export type Resolution = {
  _id: string
  identifier: string
  resolution: string
}

export type fetchResFailure = {
  type: typeof FETCH_RESOLUTION_FAILURE
  payload: {
    resolution: Resolution
  }
}

export type fetchResRequest = {
  type: typeof FETCH_RESOLUTION_REQUEST
  payload: {
    resolution: Resolution
  }
}

export type fetchResSuccess = {
  type: typeof FETCH_RESOLUTION_SUCCESS
  payload: {
    resolution: Resolution
  }
}

export type ResolutionActions =
  | fetchResRequest
  | fetchResFailure
  | fetchResSuccess

export type ResolutionState = {
  resolution: Resolution[]
  loading: boolean
  error: string
}

export type ResolutionProps = {
  res: Resolution
}
