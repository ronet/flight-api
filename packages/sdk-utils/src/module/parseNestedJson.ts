export function parseNestedJson<T>(input: T): T {
  if (typeof input === "string") {
    try {
      const parsed = JSON.parse(input);
      return parseNestedJson(parsed);
    } catch (error) {
      return input;
    }
  }
  if (typeof input === "object") {
    for (const key in input) {
      input[key] = parseNestedJson(input[key]);
    }
  }
  return input;
}
