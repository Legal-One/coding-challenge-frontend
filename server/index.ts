import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import router from './routes';

dotenv.config();

// Create a new express app instance
const app: express.Application = express();

app.use(cors());

app.get('/', (_request: Request, response: Response) =>
    response.status(200).json({
        status: 'success',
        message: 'App is running',
    }),
);

const port = process.env.PORT || 3000;

app.use('/', router);

if (process.env.NODE_ENV !== 'test') app.listen(port, () => console.log(`App running on http://localhost:${port}`));

export default app;
