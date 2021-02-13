import axios from 'axios'
import { Dispatch } from 'redux'

import {
  FETCH_RESOLUTION_REQUEST,
  FETCH_RESOLUTION_FAILURE,
  FETCH_RESOLUTION_SUCCESS,
  ResolutionActions,
  Resolution,
} from '../../Types/ResolutionType'

export const fetchResRequest = () => {
  return {
    type: FETCH_RESOLUTION_REQUEST,
  }
}

export const fetchResSuccess = (resolution: Resolution[]) => {
  return {
    type: FETCH_RESOLUTION_SUCCESS,
    payload: resolution,
  }
}

export const fetchResFailure = (error: any): ResolutionActions => {
  return {
    type: FETCH_RESOLUTION_FAILURE,
    payload: error,
  }
}

export const fetchResolution = () => {
  return (dispatch: Dispatch) => {
    dispatch(fetchResRequest())
    axios
      .get('http://localhost:8000/api/v1/resolution')
      .then((response) => {
        dispatch(fetchResSuccess(response.data))
      })
      .catch((error) => {
        dispatch(fetchResFailure(error.message))
      })
  }
}
