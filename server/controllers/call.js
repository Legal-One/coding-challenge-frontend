const pathToFile = require('../helpers/pathToFile');
const readJson = require('../helpers/readJson');
const formatResponse = require('../helpers/formatResponse');
const updateDataWithField = require('../helpers/updateDataWithField');

exports.getCallById = (req, res) => {
  const number = `+${req.params.number}`;
  readJson(pathToFile.logs, (errLogs, dataLogs) => {
    if (errLogs) {
      return res.status(500).json(formatResponse('Logs file read failure', errLogs));
    }
    readJson(pathToFile.agent, (errAgent, dataAgent) => {
      if (errAgent) {
        return res.status(500).json(formatResponse('Agent file read failure', errAgent));
      }
      readJson(pathToFile.resolution, (errResolution, dataResolution) => {
        if (errResolution) {
          return res.status(500).json(formatResponse('Resolutions file read failure', errResolution));
        }
        const dataFilteredByNumber = dataLogs.filter((dataLog) => dataLog.number.toString() === number.toString());
        if (dataFilteredByNumber.length) {
          const dataWithAgent = updateDataWithField(
            {dataRawSource: dataFilteredByNumber, dataRawKey: 'agentIdentifier'},
            {dataToAddSource: dataAgent, dataToAddKey: 'identifier'},
            'agent'
          );
          if (dataWithAgent) {
            const dataWithResolution = updateDataWithField(
              {dataRawSource: dataWithAgent, dataRawKey: 'identifier'},
              {dataToAddSource: dataResolution, dataToAddKey: 'identifier'},
              'resolution'
            );
            if (dataWithResolution) {
              return res.status(200).json(formatResponse(`Phone ${number} report`, dataWithResolution));
            } else {
              return res.status(404).json(formatResponse('By resolution ID not found', null));
            }
          } else {
            return res.status(404).json(`By agent ID not found`, null);
          }
        } else {
          return res.status(404).json(formatResponse(`By phone ${number} not found`, null));
        }
      });
    });
  });
};