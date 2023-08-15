import app from "./app";
import { createServer } from "http";
import dotenv from "dotenv";
import { connection } from "mongoose";
import mongoConnect from "./config/db-config";

dotenv.config();

const PORT = process.env.PORT;
const server = createServer(app);

connection.once("open", () => {
  console.log("MongoDB connected successfully");
  server.listen(8000, () => {
    console.log("app start on port ", PORT);
  });
});

connection.on("error", (err) => {
  console.error(err);
});

mongoConnect();
