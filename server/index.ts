import express, { Request, Response } from 'express';

import router from './routes';

// Create a new express app instance
const app: express.Application = express();

app.get('/', function (_request: Request, response: Response) {
  response.send(`Hello World!`);
});

app.use('/', router);

app.listen(3000, function () {
  console.log('App is listening on port 3000!');
});
