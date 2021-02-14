import {
  FETCH_RESOLUTION_REQUEST,
  FETCH_RESOLUTION_FAILURE,
  FETCH_RESOLUTION_SUCCESS,
  ResolutionActions,
  ResolutionState,
} from '../../Types/ResolutionType'

const initialState: ResolutionState = {
  loading: false,
  resolution: [],
  error: '',
}

const ResolutionReducers = (
  state = initialState,
  action: ResolutionActions
) => {
  switch (action.type) {
  case FETCH_RESOLUTION_REQUEST:
    return {
      ...state,
      loading: true,
    }
  case FETCH_RESOLUTION_SUCCESS:
    console.log(state, action.payload)
    return {
      ...state,
      loading: false,
      resolution: action.payload,
      error: '',
    }
  case FETCH_RESOLUTION_FAILURE:
    return {
      ...state,
      loading: false,
      resolution: [],
      error: action.payload,
    }

  default:
    return state
  }
}

export default ResolutionReducers
