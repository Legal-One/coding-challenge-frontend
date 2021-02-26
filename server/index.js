import express from 'express';
import cors from 'cors';

// route to go here
import router from './routes';


const app = express();

app.use(cors());

router(app);

// catch all routers
app.use('*', (req, res) =>
    res.status(404).json({
        message: 'Not Found. Use /api/v1 to access the Api',
    })
);

app.listen(3000, () => {
    console.log(`Success!! app listening on port ${3000}!`);
});

export default app;