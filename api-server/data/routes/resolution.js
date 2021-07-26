const resolutionRoutes = (app, fs) => {
    // variables
    const dataPath = './data/json-data/resolution.json';
  
    // READ
    app.get('/resolution', (req, res) => {
       
      fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
          throw err;
        }
        res.setHeader("Content-Type", "application/json");
        res.send(JSON.parse(data));
      });
    });
  };
  
  module.exports = resolutionRoutes;