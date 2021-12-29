const fs = require('fs');

module.exports = (path, cb) => {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, JSON.parse(data));
    }
  });
};