import axios from 'axios'
import { ROUTES } from '../routes'

export const getCallDataThunk = () => {
  return async function (dispatch, getState, endpoint) {
    const { data } = await axios.get(endpoint + ROUTES.CALL)
    if (data.status !== 'success') {
      throw new Error('Error Message')
    }
    console.log(data)
    data.data.forEach((each) => {
      each.id = each.identifier
    })
  }
}
