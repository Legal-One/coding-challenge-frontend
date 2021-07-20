const path = require('path');

const getJsonFileData = require('../utils/jsonFileReader');
const compareDate = require('../utils/compareDate');

exports.getCallLogs = async (req, res) => {
  const basePath = path.dirname(process.mainModule.filename);
  try {
    const callLogData = await getJsonFileData(path.join(basePath, '../json-data/logs.json'));
    const agentData = await getJsonFileData(path.join(basePath, '../json-data/agents.json'));
    const callLogs = formatData(callLogData, agentData);
    return res.status(200).json(callLogs);
  } catch (err) {
    return res.status(500).json({
      message: 'Oops!! Something went wrong.',
    });
  }
};

const formatData = (callLogs, agentData) => {
  return callLogs.reduce((acc, currentCallLog) => {
    const callIdentifier = currentCallLog.identifier;
    const phoneNumber = currentCallLog.number;
    const agentIdentifier = currentCallLog.agentIdentifier;
    const callTimestamp = currentCallLog.dateTime;
    const index = acc.findIndex((item) => item.phoneNumber === phoneNumber);
    const currentAgent = agentData.find((agent) => agent.identifier === agentIdentifier);
    const isCurrentCallLogMostRecent = compareDate(
      callTimestamp,
      acc[index] && acc[index].callTimestamp
    );
    // first entry of call log from `phoneNumber`
    if (index === -1) {
      acc = [
        ...acc,
        {
          identifier: callIdentifier,
          phoneNumber,
          callCount: 1,
          lastCallTime: callTimestamp,
          agentIdentifier,
          agentName: getAgentName(currentAgent),
        },
      ];
    } else {
      // Already call log exists for this `phoneNumber`
      const existingCallLog = acc[index];
      const agentFromExistingCall = agentData.find(
        (agent) => agent.identifier === existingCallLog.agentIdentifier
      );
      acc[index] = {
        identifier: isCurrentCallLogMostRecent ? callIdentifier : existingCallLog.identifier,
        phoneNumber,
        callCount: acc[index].callCount + 1,
        lastCallTime: isCurrentCallLogMostRecent ? callTimestamp : existingCallLog.lastCallTime,
        agentIdentifier: isCurrentCallLogMostRecent
          ? agentIdentifier
          : existingCallLog.agentIdentifier,
        agentName: isCurrentCallLogMostRecent
          ? currentAgentName
          : getAgentName(agentFromExistingCall),
      };
    }

    return acc;
  }, []);
};

const getAgentName = (agent) => {
  return `${agent.firstName} ${agent.lastName}`;
};
