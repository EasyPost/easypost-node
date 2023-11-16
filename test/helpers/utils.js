/**
 * Utils to remove the _params key and all params keys from nested objects from
 * an EasyPostObject for sake of comparison in tests
 * @param {*} obj an EasyPostObject to remove the params from
 * @returns {*} obj without the _params key
 */
export const withoutParams = (obj) =>
  Object.fromEntries(
    Object.entries(obj)
      .map(([key, value]) =>
        key === '_params'
          ? null
          : !value
          ? [key, value]
          : Array.isArray(value)
          ? [
              key,
              value.map((arrValue) =>
                typeof arrValue === 'object' ? withoutParams(arrValue) : arrValue,
              ),
            ]
          : typeof value === 'object'
          ? [key, withoutParams(value)]
          : [key, value],
      )
      .filter(Boolean),
  );
