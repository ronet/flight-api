export async function promiseAllSerial<T, U>({
  inputList,
  fn,
}: {
  inputList: T[];
  fn: (input: T) => Promise<U>;
}) {
  return await executeSerially({
    inputList,
    fn,
  });
}

async function executeSerially<T, U>({
  inputList,
  fn,
  index = 0,
  result = [],
}: {
  inputList: T[];
  fn: (input: T) => Promise<U>;
  index?: number;
  result?: U[];
}): Promise<U[]> {
  if (index >= inputList.length) {
    return result;
  }
  const input = inputList[index];
  return await fn(input).then((response) =>
    executeSerially({
      fn,
      inputList,
      index: index + 1,
      result: [...result, response],
    })
  );
}
