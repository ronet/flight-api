export function errorToString(error: Error) {
  const errorObj = {
    name: error.name,
    message: error.message,
    stack: error.stack,
  };
  return JSON.stringify(errorObj);
}
