import { delay } from "./delay";

export async function retry<T, U>(
  fn: () => Promise<T>,
  {
    tryCount = 3,
    delayTime = 200,
    onFailure: onFailure,
  }: {
    tryCount?: number;
    delayTime?: number;
    onFailure?: ({
      error,
      tryCount,
    }: {
      error: any;
      tryCount: number;
    }) => Promise<U>;
  } = {}
): Promise<T> {
  return await fn().catch(async (error) => {
    if (tryCount === 1) {
      return Promise.reject(error);
    }
    return await (onFailure
      ? onFailure({ error, tryCount: tryCount - 1 })
      : Promise.resolve()
    )
      .then(async () => await delay(delayTime))
      .then(
        async () =>
          await retry(fn, { tryCount: tryCount - 1, delayTime, onFailure })
      );
  });
}
