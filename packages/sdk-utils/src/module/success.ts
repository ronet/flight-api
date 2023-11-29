import { Response } from "../model";

export function success<T>(input: Response<T>): Promise<Response<T>> {
  const { code, data, inputData } = input;
  return Promise.resolve({
    code: code || 0,
    data,
    inputData,
  });
}
