import EasyPostObject from './easypost_object';

/**
 * A {@link https://docs.easypost.com/docs/carrier-types CarrierType} represents the valid fields for a {@link CarrierAccount carrier account}.
 * @public
 * @extends EasyPostObject
 */
export default class CarrierType extends EasyPostObject {
  declare fields: Record<string, unknown>;
  declare type: string;
}
