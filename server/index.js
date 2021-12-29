const jsonServer = require('json-server')
const server = jsonServer.create()
const db = require('./db.js')()
const router = jsonServer.router(db)
const middlewares = jsonServer.defaults()

server.use(middlewares)

const compareDate = (date1, date2) => new Date(date1) >= new Date(date2);
const agentFullName = (agent) => `${agent.firstName} ${agent.lastName}`

server.get('/call-logs', (req, res) => {
  const callLogs = db.logs
  const agents  = db.agents
  const callLogsArray = callLogs.reduce((current, currentLog) => {
    const identifier = currentLog.identifier;
    const phoneNumber = currentLog.number;
    const agentIdentifier = currentLog.agentIdentifier;
    const callTimestamp = currentLog.dateTime;
    const index = current.findIndex((item) => item.phoneNumber === phoneNumber);
    const currentAgent = agents.find((agent) => agent.identifier === agentIdentifier);
    const isCurrentCallLogMostRecent = compareDate( callTimestamp,  current[index] && current[index].callTimestamp);
    // If Call log doesnot exist from `phoneNumber`
    if (index === -1) {
      current = [
        ...current,
        {
          identifier: identifier,
          phoneNumber,
          callCount: 1,
          lastCallTime: callTimestamp,
          agentIdentifier,
          agentName: agentFullName(currentAgent),
        },
      ];
    } else {
      // Update Existing Logs for this `phoneNumber`
      const existingCallLog = current[index];
      const existingAgentCallLog = agents.find(
        (agent) => agent.identifier === existingCallLog.agentIdentifier
      );
      current[index] = {
        identifier: isCurrentCallLogMostRecent ? identifier : existingCallLog.identifier,
        phoneNumber,
        callCount: current[index].callCount + 1,
        lastCallTime: isCurrentCallLogMostRecent ? callTimestamp : existingCallLog.lastCallTime,
        agentIdentifier: isCurrentCallLogMostRecent
          ? agentIdentifier
          : existingCallLog.agentIdentifier,
        agentName: isCurrentCallLogMostRecent
          ? currentAgent
          : agentFullName(existingAgentCallLog),
      };
    }
    return current;
  }, []);
  res.jsonp(callLogsArray)
})

server.use(router)
server.listen(4000, function () {
  console.log(`JSON Server is running ${4000}`)
})