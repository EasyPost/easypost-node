import EasyPostObject from './easypost_object';

/**
 * A {@link https://docs.easypost.com/docs/parcels Parcel} represents a physical container being shipped, such as a box or envelope, with corresponding dimensions and weight.
 * @public
 * @extends EasyPostObject
 */
export default class Parcel extends EasyPostObject {
  static height;
  static length;
  static predefined_package;
  static weight;
  static width;
}
