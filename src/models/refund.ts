import EasyPostObject from './easypost_object';

/**
 * A {@link https://docs.easypost.com/docs/refunds Refund} represents a refunded {@link Shipment}.
 * @public
 * @extends EasyPostObject
 */
export default class Refund extends EasyPostObject {
  declare carrier: string | null;
  declare confirmation_number: string | null;
  declare shipment_id: string | null;
  declare status: 'submitted' | 'refunded' | 'rejected' | null;
  declare tracking_code: string | null;
}
