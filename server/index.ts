import express, { Request, Response } from 'express';

// Create a new express app instance
const app: express.Application = express();

app.get('/', function (request: Request, response: Response) {
  response.send(`Hello World!`);
});

app.listen(3000, function () {
  console.log('App is listening on port 3000!');
});
