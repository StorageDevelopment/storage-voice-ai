import express from 'express';
import toolsRoute from './routes/toolsRoute';
import mgmtRoute from './routes/mgmtRoute';
import { Request, Response, NextFunction } from 'express';

const app = express();

app.use(express.json());
app.use('/api/tools', toolsRoute);
app.use('/api/mgmt',  mgmtRoute);

//unknown route
app.use((req : Request, res : Response, next : NextFunction) => {
    res.status(404).send("Unknown route");
});

//default error handler
app.use((err : any, req : Request, res : Response, next : NextFunction) => {
    res.status(500).json({message: err});
});

export default app;