import {
  FETCH_DASHBOARD_DATA,
  FETCH_AGENT_DATA,
  FETCH_CALL_DATA
} from './actionTypes'

let initialState = {
  dashboardTableData: null,
  completeLogData: null
}

const appReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_DASHBOARD_DATA:
      return {
        ...state,
        dashboardTableData: payload.finalDashboardTableData,
        completeLogData: payload.completeLogData
      }
    default:
      return state
  }
}

const setDashboardData = (payload) => ({
  type: FETCH_DASHBOARD_DATA,
  payload
})


export { setDashboardData }

export default appReducer
