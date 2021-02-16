import { Logs } from './Types/LogsType'

export const groupBy = (objectArray: Logs[], property: string) => {
  return objectArray.reduce(function (acc, obj) {
    let key = obj[property]
    if (!acc[key]) {
      acc[key] = []
    }
    acc[key].push(obj)
    return acc
  }, {})
}
