import express from "express";
import toolsRoute from "./routes/toolsRoute";
import { toolsController } from "./controllers/toolsController";
import { Request, Response, NextFunction } from "express";

const app = express();

app.use(express.json());
app.post("/api/tools", toolsController);

//unknown route
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).send("Unknown route");
});

//default error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(500).send(JSON.stringify(err));
});

export default app;
