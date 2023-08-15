export interface ErrorResponse {
  codeError: number;
  message: string;
}

export interface missingFiled {
  fieldname: string;
  missing: boolean;
}

export interface MissingFields {
  message: "Missing required fileds";
  fiedls: missingFiled[];
}
