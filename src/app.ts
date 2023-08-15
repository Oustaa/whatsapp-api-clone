import cors from "cors";
import express from "express";

import AuthRoutes from "./routes/auth";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

app.use("/api/auth", AuthRoutes);

export default app;
