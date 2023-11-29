import { Response } from "../model";
import { errorToString } from "./errorToString";

export function finalize(
  input: Omit<Response<never>, "data">,
): Promise<Response<never>> {
  const { code, error, comment, inputData } = input;
  if (typeof error === "object" && error["error"]) {
    return Promise.resolve({
      code: error["code"] || code,
      data: null as never,
      error: error["error"] || error,
      comment: error["comment"] || comment,
      inputData: error["inputData"] || inputData,
    });
  }
  const errorMessage = typeof error === "object" ? errorToString(error) : error;
  return Promise.resolve({
    code: code || 999,
    data: null as never,
    error: errorMessage,
    comment,
    inputData,
  });
}
