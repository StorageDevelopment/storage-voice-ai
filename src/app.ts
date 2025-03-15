import "dotenv/config";
import express from "express";
import toolsRoute from "./routes/toolsRoute";
import mgmtRoute from "./routes/mgmtRoute";
import { Request, Response, NextFunction } from "express";
import { HttpError } from "./http-error";

const app = express();

app.use(express.json());
app.use("/api/tools", toolsRoute);
app.use("/api/mgmt", mgmtRoute);

//unknown route
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).send("Unknown route");
});

//default error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof HttpError) {
    const httpError = err as HttpError;
    res.status(httpError.statusCode).json({ message: httpError.message });
  } else if (err instanceof Error) {
    const error = err as Error;
    res.status(500).json({ message: error.message });
  } else {
    res.status(500).json({ message: err });
  }
});

export default app;
