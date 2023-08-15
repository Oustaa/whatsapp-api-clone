import { Schema, model } from "mongoose";

const userSchema = new Schema({
  f_name: { type: String, require: true },
  l_name: { type: String, require: true },
  user_name: { type: String, require: true },
  password: { type: String, require: true },
  email: String,
  phone: String,
});

export default model("User", userSchema);
