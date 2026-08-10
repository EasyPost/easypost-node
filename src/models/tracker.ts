import EasyPostObject from './easypost_object';

/**
 * A {@link https://docs.easypost.com/docs/trackers Tracker} represents the available tracking information for a package.
 * @public
 * @extends EasyPostObject
 */
export default class Tracker extends EasyPostObject {
  declare carrier_detail: Record<string, unknown> | null;
  declare carrier: string | null;
  declare est_delivery_date: string | null;
  declare fees: Record<string, unknown>[] | null;
  declare finalized: boolean | null;
  declare is_return: boolean | null;
  declare public_url: string | null;
  declare shipment_id: string | null;
  declare signed_by: string | null;
  declare status_detail: string | null;
  declare status: string | null;
  declare tracking_code: string | null;
  declare tracking_details: Record<string, unknown>[] | null;
  declare weight: number | null;
}
