/**
 * An EasyPostObject is the base class for all EasyPost API resources.
 * @internal
 * @abstract
 */
export default class EasyPostObject {
  static id: string;
  static object: string;
  static mode: string;
  static created_at: string;
  static updated_at: string;
  static _params: Record<string, unknown>;

  static [Symbol.hasInstance](instance: unknown): boolean {
    if (instance == null || typeof instance !== 'object') {
      return false;
    }

    const modelConstructor = (instance as Record<symbol, unknown>)[
      Symbol.for('easypost.modelConstructor')
    ];
    if (typeof modelConstructor === 'function') {
      return modelConstructor === this;
    }

    // Fallback for plain API payloads that include object names like "Address" or "Shipment".
    return (
      typeof (instance as Record<string, unknown>).object === 'string' &&
      (instance as Record<string, unknown>).object === this.name
    );
  }
}
