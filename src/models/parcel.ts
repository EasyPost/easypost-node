import EasyPostObject from './easypost_object';

/**
 * A {@link https://docs.easypost.com/docs/parcels Parcel} represents a physical container being shipped, such as a box or envelope, with corresponding dimensions and weight.
 * @public
 * @extends EasyPostObject
 */
export default class Parcel extends EasyPostObject {
  declare height?: number | null;
  declare length?: number | null;
  declare predefined_package?: string | null;
  declare weight: number;
  declare width?: number | null;
}
