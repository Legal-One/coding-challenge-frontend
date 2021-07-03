import axios from 'axios'
import { setDashboardData } from '../reducer'
import { ROUTES } from '../routes'

export const getDashboardDataThunk = () => {
  return async function (dispatch, getState, endpoint) {
    const { data } = await axios.get(endpoint + ROUTES.DASHBOARD)
    if (data.status !== 'success') {
      throw new Error(data.message)
    }

    const completeLogData = data.data
    completeLogData.forEach((each) => {
      each.id = each.identifier
    })

    // array of all the distinct phone numbers
    const uniqueNumbers = completeLogData
      .map((eachData) => eachData.number)
      .filter((value, index, self) => self.indexOf(value) === index)

    let finalDashboardTableData = uniqueNumbers.map((number) => {
      // logDataForNumber is the logs With Resolutions And Agents data combined for each phone number
      let logDataForNumber = completeLogData.filter(
        (log) => log.number === number
      )

      // total calls made to a specific number
      let callCount = logDataForNumber.length

      // last call Record is the last value in the array logDataForNumber
      let lastCallRecord = logDataForNumber[callCount - 1]

      return { ...lastCallRecord, callCount } // last call record and call count
    })
    dispatch(setDashboardData({ finalDashboardTableData, completeLogData }))
  }
}
