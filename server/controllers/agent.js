const pathToFile = require('../helpers/pathToFile');
const readJson = require('../helpers/readJson');
const formatResponse = require('../helpers/formatResponse');
const updateDataWithField = require('../helpers/updateDataWithField');

exports.getAllAgents = (req, res) => {
  readJson(pathToFile.agent, (errAgent, dataAgent) => {
    if (errAgent) {
      return res.status(500).json(formatResponse('Agents file read failure', errAgent));
    }
    return res.status(200).json(formatResponse('Agents list', dataAgent));
  });
};

exports.getAgentById = (req, res) => {
  const agentId = req.params.id;
  readJson(pathToFile.logs, (errLogs, dataLogs) => {
    if (errLogs) {
      return res.status(500).json(formatResponse('Logs file read failure', errLogs));
    }
    readJson(pathToFile.resolution, (errResolution, dataResolution) => {
      if (errResolution) {
        return res.status(500).json(formatResponse('Resolutions file read failure', errResolution));
      }
      const dataFilteredByAgent = dataLogs.filter(
        (dataLog) => {
          return dataLog.agentIdentifier?.toString() === agentId.toString() }
      );
      if (dataFilteredByAgent.length) {
       
        const formattedData = updateDataWithField(
          {dataRawSource: dataFilteredByAgent, dataRawKey: 'identifier'},
          {dataToAddSource: dataResolution, dataToAddKey: 'identifier'},
          'resolution'
        );
        if (formattedData) {
          return res.status(200).json(formatResponse(`Agent ${agentId} report`, formattedData));
        } else {
          return res.status(404).json(formatResponse('By resolution not found', null));
        }
      } else {
        return res.status(404).json(formatResponse(`By agent ${agentId} not found`, null));
      }
    });
  });
};