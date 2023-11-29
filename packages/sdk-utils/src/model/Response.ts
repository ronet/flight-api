import { ErrorCode } from "./ErrorCode";
import { SuccessCode } from "./SuccessCode";

export interface Response<T> {
  data: T;
  code?: SuccessCode | ErrorCode;
  error?: string;
  comment?: string;
  inputData?: any;
}
