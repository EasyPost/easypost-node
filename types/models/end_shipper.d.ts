import EasyPostObject from './easypost_object';
/**
 * An {@link https://docs.easypost.com/docs/endshippers EndShipper} represents a person or business entity that is authorized to purchase postage on behalf of another person and is ultimately responsible for the shipment.
 * @public
 * @extends EasyPostObject
 */
export default class EndShipper extends EasyPostObject {
    street1?: string | null;
    street2?: string | null;
    city?: string | null;
    state?: string | null;
    zip?: string | null;
    country?: string | null;
    name?: string | null;
    company?: string | null;
    phone?: string | null;
    email?: string | null;
}
