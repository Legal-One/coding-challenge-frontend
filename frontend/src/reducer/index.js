import {
  FETCH_DASHBOARD_DATA,
  FETCH_AGENT_DATA,
  FETCH_CALL_DATA
} from './actionTypes'

let initialState = {
  data: null
}

const appReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_DASHBOARD_DATA:
      return {
        ...state,
        data: payload
      }
    default:
      return state
  }
}

const setDashboardData = (data) => ({
  type: FETCH_DASHBOARD_DATA,
  payload: data
})

export { setDashboardData }

export default appReducer
