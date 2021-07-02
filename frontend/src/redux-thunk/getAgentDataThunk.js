import axios from 'axios'
import { setAgentData } from '../reducer'
import { ROUTES } from '../routes'

export const getAgentDataThunk = (id) => {
  return async function (dispatch, getState, endpoint) {
    const { data } = await axios.get(endpoint + ROUTES.AGENT + '/' + id)
    console.log(data)
    if (data.status !== 'success') {
      throw new Error(data.message)
    }
    const agentLogs = data.logs
    agentLogs.forEach((each) => {
      each.id = each.identifier
    })
    dispatch(setAgentData({ agentLogs, agent: data.agent }))
  }
}
