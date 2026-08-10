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
    static [Symbol.hasInstance](instance: unknown): boolean;
}
