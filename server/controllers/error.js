const formatResponse = require('../helpers/formatResponse');

exports.get404 = (req, res) => {
  res.status(404).json(formatResponse('Incorrect endpoint', null));
};