// src/server.ts
import express, { Request, Response } from "express";
import { getCustomer } from "./actions";

let app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

app.get("/customers/:id?", getCustomer);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
