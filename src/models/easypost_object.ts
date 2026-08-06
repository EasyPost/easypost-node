// @ts-nocheck
/**
 * An EasyPostObject is the base class for all EasyPost API resources.
 * @internal
 * @abstract
 */
export default class EasyPostObject {
  static id;
  static object;
  static mode;
  static created_at;
  static updated_at;
  static _params;

  static [Symbol.hasInstance](instance) {
    if (instance == null || typeof instance !== 'object') {
      return false;
    }

    const modelConstructor = instance[Symbol.for('easypost.modelConstructor')];
    if (typeof modelConstructor === 'function') {
      return modelConstructor === this;
    }

    // Fallback for plain API payloads that include object names like "Address" or "Shipment".
    return typeof instance.object === 'string' && instance.object === this.name;
  }
}
