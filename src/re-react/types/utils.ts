export function assertIsDefined<T>(
  value: T,
  variableNameInErrorLog: string,
): asserts value is NonNullable<T> {
  if (value == null)
    throw new Error(`Expected ${variableNameInErrorLog} to be defined`);
}
