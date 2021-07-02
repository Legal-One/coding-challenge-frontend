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
    return res.json({
      status: 'success',
      message: 'Dashboard data',
      data: logsWithResolutionsAndAgents
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
