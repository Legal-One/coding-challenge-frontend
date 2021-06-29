// import for Json Data
const agents = require('../../json-data/agents.json')
const logs = require('../../json-data/logs.json')
const resolutions = require('../../json-data/resolution.json')

// combining logs and resolutions and agents
const logsWithResolutionsAndAgents = logs.map((log) => ({
  ...resolutions.find((resolution) => resolution.identifier === log.identifier),
  ...agents.find((agent) => agent.identifier === log.agentIdentifier),
  ...log // log is spreaded after the rest because otherwise the log.identifier value will get effected by agents.identifier
}))

// get Dashboard Data
async function getDashboardData(req, res) {
  try {
    // array of all the distinct phone numbers
    const uniqueNumbers = logsWithResolutionsAndAgents
      .map((eachData) => eachData.number)
      .filter((value, index, self) => self.indexOf(value) === index)

    const finalData = uniqueNumbers.map((number) => {
      // logDataForNumber is the logs With Resolutions And Agents data combined for each phone number
      let logDataForNumber = logsWithResolutionsAndAgents.filter(
        (log) => log.number === number
      )

      // total calls made to a specific number
      let callCount = logDataForNumber.length

      // last call Record is the last value in the array logDataForNumber
      let lastCallRecord = logDataForNumber[callCount - 1]

      return { ...lastCallRecord, callCount } // last call record and call count
    })

    return res.json({
      status: 'success',
      message: 'Dashboard data',
      data: finalData
    })
  } catch (err) {
    return res.json({ status: 'error', message: err })
  }
}

// get Agent Data
async function getAgentData(req, res) {
  try {
    const { id } = req.params

    // checking the id param
    if (!id) {
      return res.json({
        status: 'error',
        message: 'Bad Request'
      })
    }

    // checking the agent exist or not
    if (agents.find((agent) => agent.identifier === id) === undefined) {
      return res.json({
        status: 'error',
        message: 'Agent not found'
      })
    }

    return res.json({
      status: 'success',
      message: `Data for Agent - ${id}`,
      agent: agents.find((agent) => agent.identifier === id),
      logs: logsWithResolutionsAndAgents.filter(
        (log) => log.agentIdentifier === id
      )
    })
  } catch (err) {
    return res.json({ status: 'error', message: err })
  }
}

// get Call Data
async function getCallsData(req, res) {
  try {
    const { number } = req.params

    // checking the number param
    if (!number) {
      return res.json({
        status: 'error',
        message: 'Bad Request'
      })
    }

    // checking the number exist or not
    if (logs.find((log) => log.number === number) === undefined) {
      return res.json({
        status: 'error',
        message: 'Number not found'
      })
    }

    return res.json({
      status: 'success',
      message: `Data for Number - ${number}`,
      logs: logsWithResolutionsAndAgents.filter((log) => log.number === number)
    })
  } catch (err) {
    return res.json({ status: 'error', message: err })
  }
}

module.exports = { getDashboardData, getAgentData, getCallsData }
