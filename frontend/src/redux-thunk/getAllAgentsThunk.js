import axios from 'axios'
import { setAllAgents } from '../reducer'
import { ROUTES } from '../routes'

export const getAllAgentsThunk = () => {
  return async function (dispatch, getState, endpoint) {
    const { data } = await axios.get(endpoint + ROUTES.AGENT)
    console.log(data)
    if (data.status !== 'success') {
      throw new Error(data.message)
    }
    dispatch(setAllAgents(data.agents))
  }
}
