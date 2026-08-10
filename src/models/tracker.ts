import EasyPostObject from './easypost_object';

/**
 * A {@link https://docs.easypost.com/docs/trackers Tracker} represents the available tracking information for a package.
 * @public
 * @extends EasyPostObject
 */
export default class Tracker extends EasyPostObject {
  declare carrier_detail: Record<string, unknown>;
  declare carrier: string;
  declare est_delivery_date: string;
  declare fees: Record<string, unknown>[];
  declare finalized: boolean;
  declare is_return: boolean;
  declare public_url: string;
  declare shipment_id: string;
  declare signed_by: string;
  declare status_detail: string;
  declare status: string;
  declare tracking_code: string;
  declare tracking_details: Record<string, unknown>[];
  declare weight: number;
}
