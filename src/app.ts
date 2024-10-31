import express from 'express';
import exampleRoutes from './routes/exampleRoutes';

const app = express();

app.use(express.json());
app.use('/api/example', exampleRoutes);

export default app;