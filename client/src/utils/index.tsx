export const getHourAndMinute = (dateString: string) => {
  const date = new Date(dateString)
  const hourMinuteString = `${date.getHours()}:${date.getMinutes()}`
  return hourMinuteString
}

export const getDayMonthYear = (dateString: string) => {
  const date = new Date(dateString)
  const dayMonthYearString = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
  return dayMonthYearString
}
