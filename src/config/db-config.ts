import { connect } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI: string = process.env.MONGODB_URI!;

export default function mongoConnect() {
  return connect(MONGODB_URI);
}
