/**
 * An EasyPostObject is the base class for all EasyPost API resources.
 * @internal
 * @abstract
 */
const isObjectRecord = (value: unknown): value is Record<PropertyKey, unknown> =>
  value != null && typeof value === 'object';

export default class EasyPostObject {
  static id: string;
  static object: string;
  static mode: string;
  static created_at: string;
  static updated_at: string;
  static _params: Record<string, unknown>;

  static [Symbol.hasInstance](instance: unknown): boolean {
    if (!isObjectRecord(instance)) {
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
