import axios from 'axios'
import { setDashboardData } from '../reducer'
import { ROUTES } from '../routes'

export const getDashboardDataThunk = () => {
  return async function (dispatch, getState, endpoint) {
    const { data } = await axios.get(endpoint + ROUTES.DASHBOARD)
    if (data.status !== 'success') {
      throw new Error('Error Message')
    }
    console.log(data)
    data.data.forEach((each) => {
      each.id = each.identifier
    })
    dispatch(setDashboardData(data.data))
  }
}
