const pathToFile = require('../helpers/pathToFile');
const readJson = require('../helpers/readJson');
const formatResponse = require('../helpers/formatResponse');
const groupLogsByPhone = require('../helpers/groupLogsByPhone');
const updateDataWithField = require('../helpers/updateDataWithField');

exports.getBase = (req, res) => {
  readJson(pathToFile.logs, (errLog, dataLog) => {
    if (errLog) {
      return res.status(500).json(formatResponse('Logs file read failure', errLog));
    }
    readJson(pathToFile.agent, (errAgent, dataAgent) => {
      if (errAgent) {
        return res.status(500).json(formatResponse('Agents file read failure', errAgent));
      }
      const groupedByPhone = groupLogsByPhone(dataLog);
      const formattedData = updateDataWithField(
        {dataRawSource: groupedByPhone, dataRawKey: 'agent'},
        {dataToAddSource: dataAgent, dataToAddKey: 'identifier'},
        'agent'
      );
      if (formattedData) {
        return res.status(200).json(formatResponse('General report', formattedData));
      } else {
        return res.status(404).json(formatResponse('Some agent or log ID not found', null));
      }
    });
  });
};