const logsRoutes = (app, fs) => {
    // variables
    const dataPath = './data/json-data/logs.json';
  
    // READ
    app.get('/logs', (req, res) => {
       
      fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
          throw err;
        }
        res.setHeader("Content-Type", "application/json");
        res.send(JSON.parse(data));
      });
    });
  };
  
  module.exports = logsRoutes;