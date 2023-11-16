/**
 * Utils to remove the _params key and all params keys from nested objects from
 * an EasyPostObject for sake of comparison in tests
 * @param {*} obj an EasyPostObject to remove the params from
 * @returns {*} obj without the _params key
 */
export const withoutParams = (obj) =>
  Object.fromEntries(
    Object.entries(obj)
      .map(([key, value]) => {
        if (key === '_params') {
          return null;
        }

        if (!value) {
          return [key, value];
        }

        if (Array.isArray(value)) {
          return [
            key,
            value.map((arrValue) =>
              typeof arrValue === 'object' ? withoutParams(arrValue) : arrValue,
            ),
          ];
        }

        if (typeof value === 'object') {
          return [key, withoutParams(value)];
        }

        return [key, value];
      })
      .filter(Boolean),
  );
