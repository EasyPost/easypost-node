import EasyPostObject from './easypost_object';

/**
 * A {@link https://docs.easypost.com/docs/refunds Refund} represents a refunded {@link Shipment}.
 * @public
 * @extends EasyPostObject
 */
export default class Refund extends EasyPostObject {
  declare carrier: string;
  declare confirmation_number: string;
  declare shipment_id: string;
  declare status: 'submitted' | 'refunded' | 'rejected';
  declare tracking_code: string;
}
