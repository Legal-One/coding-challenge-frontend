const path = require('path');

const dataDir = path.resolve('json-data');

const pathGenerator = fileName => path.resolve(dataDir, fileName)

const isValidId = (id) => {
  return id.length === 36 ? id : false
}

const sanitizeNumber = (number) => {
  if (/^(?:\+|00)49\d{9}$/.test(number)) {
    return `+${number.match(/49\d{9}/)}`
  }
  return false
}

const findLastCall = (callsArray) => {
  const sortedCallsArray = [...callsArray].sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime))
  const lastCallDetails = sortedCallsArray[0]
  const lastCallDateTime = new Date(lastCallDetails.dateTime)
  const { identifier } = lastCallDetails
  const agentAndTime = `${lastCallDetails.agent} / ${lastCallDateTime.getUTCHours()}:${lastCallDateTime.getUTCMinutes()}`

  return { identifier, agentAndTime }
}

module.exports = {
  pathGenerator, isValidId, sanitizeNumber, findLastCall
}
