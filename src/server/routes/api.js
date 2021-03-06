const express = require('express')
const fsp = require('fs').promises;

const {
  pathGenerator, isValidId, sanitizeNumber, findLastCall
} = require('../helpers')

const router = express.Router()

const logsPath = pathGenerator('logs.json')
const agentsPath = pathGenerator('agents.json')
const resolutionPath = pathGenerator('resolution.json')

router
  .route('/')
  .get(async (req, res) => {
    try {
      const dataObj = {};

      const agentsIdToName = {}

      const agentsData = JSON.parse(await fsp.readFile(agentsPath))

      agentsData.forEach((agent) => {
        const id = agent.identifier
        if (!agentsIdToName[id]) {
          agentsIdToName[id] = `${agent.firstName} ${agent.lastName}`
        }
      })

      const logsData = JSON.parse(await fsp.readFile(logsPath))

      logsData.forEach((log) => {
        const phoneNumber = log.number
        if (!dataObj[phoneNumber]) {
          dataObj[phoneNumber] = {
            calls: []
          }
        }

        const { dateTime, identifier } = log
        const agent = agentsIdToName[log.agentIdentifier]
        dataObj[phoneNumber].calls.push({ dateTime, agent, identifier })
      })

      const data = Object.keys(dataObj).map((phone) => {
        const callsArray = dataObj[phone].calls
        const numberOfCalls = `${callsArray.length} calls`
        const { agentAndTime, identifier } = findLastCall(callsArray)


        return [phone, numberOfCalls, agentAndTime, identifier, phone]
      })

      res.send({ error: false, data });
    } catch (e) {
      res.send({ error: true, message: e.message });
    }
  });

router
  .route('/call/:number')
  .get(async (req, res) => {
    let { number } = req.params
    number = sanitizeNumber(number)

    if (number) {
      try {
        const resolutionData = JSON.parse(await fsp.readFile(resolutionPath))
        const agentsData = JSON.parse(await fsp.readFile(agentsPath))
        const logsData = JSON.parse(await fsp.readFile(logsPath))
        const filteredLogs = logsData.filter(log => log.number === number)

        const data = filteredLogs.map((log) => {
          const resolutionObj = resolutionData.find(item => item.identifier === log.identifier)
          const agentNameObj = agentsData.find(agent => agent.identifier === log.agentIdentifier)

          const agentName = `${agentNameObj.firstName} ${agentNameObj.lastName}`
          const dateTimeStr = new Date(log.dateTime).toLocaleString().split(',').join('')
          const { resolution, identifier } = resolutionObj
          const { identifier: agentIdentifier } = agentNameObj

          return [agentName, dateTimeStr, resolution, identifier, agentIdentifier]
        })

        res.send({ error: false, data });
      } catch (e) {
        res.send({ error: true, message: e.message });
      }
    } else {
      res.send({ error: true, message: 'Please provide a valid number(valid forma start with +49, 0049 or 49).' });
    }
  });

router
  .route('/agent/:ID')
  .get(async (req, res) => {
    let { ID } = req.params
    ID = isValidId(ID)

    if (ID) {
      try {
        const logsData = JSON.parse(await fsp.readFile(logsPath))
        const resolutionData = JSON.parse(await fsp.readFile(resolutionPath))
        const agentLog = logsData.filter(log => log.agentIdentifier === ID)

        const data = agentLog.map((log) => {
          const { number, dateTime, identifier } = log

          const resolutionObj = resolutionData.find(item => item.identifier === identifier)
          const { resolution } = resolutionObj

          const dateTimeStr = new Date(dateTime).toLocaleString().split(',').join('')

          return [number, dateTimeStr, resolution, identifier, number]
        })

        res.send({ error: false, data });
      } catch (e) {
        res.send({ error: true, message: e.message });
      }
    } else {
      res.send({ error: true, message: 'Please provide a valid agent ID.' });
    }
  });

module.exports = router
