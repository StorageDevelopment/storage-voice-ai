import express from 'express';
import exampleRoutes from './routes/exampleRoutes';
import { Request, Response, NextFunction } from 'express';

const app = express();

app.use(express.json());
app.use('/api/example', exampleRoutes);

//default error handler
app.use((err : any, req : Request, res : Response, next : NextFunction) => {
    res.status(500).send(JSON.stringify(err));
});

export default app;