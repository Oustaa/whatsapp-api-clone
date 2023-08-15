import { ErrorResponse } from "../core/Respons-types";
import { Response } from "express";

export function errorResponse(error: ErrorResponse, res: Response) {
  console.log(error);
  return res.status(error.codeError).json({ error_messgae: error.message });
}
