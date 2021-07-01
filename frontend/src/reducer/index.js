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
    case FETCH_AGENT_DATA:
      return {
        ...state,
        completeLogData: state.completeLogData
          ? state.completeLogData.map(
              (eachlog) =>
                payload.find(
                  (agentEachlog) => agentEachlog.id === eachlog.id
                ) || eachlog
            )
          : payload
      }
    case FETCH_CALL_DATA:
      return {
        ...state,
        completeLogData: state.completeLogData
          ? state.completeLogData.map(
              (eachlog) =>
                payload.find(
                  (numberEachlog) => numberEachlog.id === eachlog.id
                ) || eachlog
            )
          : payload
      }
    default:
      return state
  }
}

const setDashboardData = (payload) => ({
  type: FETCH_DASHBOARD_DATA,
  payload
})

const setAgentData = (payload) => ({
  type: FETCH_AGENT_DATA,
  payload
})

const setNumberData = (payload) => ({
  type: FETCH_CALL_DATA,
  payload
})

export { setDashboardData, setAgentData, setNumberData }

export default appReducer
