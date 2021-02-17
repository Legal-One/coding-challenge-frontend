import express, { Request, Response, Application } from 'express';
import cors from 'cors';

import router from './routes';

// Create a new express app instance
const app: Application = express();

app.use(cors());

app.get('/', (_request: Request, response: Response) =>
    response.status(200).json({
        status: 'success',
        message: 'App is running',
    }),
);

const port = 3000;

app.use('/', router);

app.listen(port, () => console.log(`App running on http://localhost:${port}`));

export default app;
