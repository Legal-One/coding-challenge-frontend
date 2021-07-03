import moment from 'moment'

const dateTimeFormatter = (dateTime) => {
  return moment(dateTime).format('Do MMM YY h:mm a')
}

export { dateTimeFormatter }
