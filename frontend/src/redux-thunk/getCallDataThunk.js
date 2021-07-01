import axios from 'axios'
import { setNumberData } from '../reducer'
import { ROUTES } from '../routes'

export const getCallDataThunk = (number) => {
  return async function (dispatch, getState, endpoint) {
    const { data } = await axios.get(endpoint + ROUTES.CALL + '/' + number)
    console.log(endpoint + ROUTES.CALL + '/' + number, data)
    if (data.status !== 'success') {
      throw new Error(data.message)
    }
    const numberLogs = data.logs
    console.log(data)
    numberLogs.forEach((each) => {
      each.id = each.identifier
    })
    dispatch(setNumberData(numberLogs))
  }
}
