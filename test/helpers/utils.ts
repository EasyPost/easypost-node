/**
 * Remove `_params` keys recursively for object comparison in tests.
 */
export const withoutParams = <T>(obj: T): T => {
  if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) {
    return obj;
  }

  const input = obj as Record<string, unknown>;
  const entries: Array<[string, unknown]> = [];

  for (const [key, value] of Object.entries(input)) {
    if (key === '_params') {
      continue;
    }

    if (!value) {
      entries.push([key, value]);
      continue;
    }

    if (Array.isArray(value)) {
      entries.push([
        key,
        value.map((arrValue) =>
          typeof arrValue === 'object' && arrValue !== null ? withoutParams(arrValue) : arrValue,
        ),
      ]);
      continue;
    }

    if (typeof value === 'object') {
      entries.push([key, withoutParams(value)]);
      continue;
    }

    entries.push([key, value]);
  }

  return Object.fromEntries(entries) as T;
};
