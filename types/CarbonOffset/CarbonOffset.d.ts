import { IObjectWithId } from '../base';

/**
 * The Carbon Offset API estimates the carbon emissions on parcel delivery for a given shipment, and allows purchasing offsets to neutralize carbon emissions from parcel delivery.
 *
 * To use the Carbon Offset API, set carbon_offset to "true" when creating a Shipment. Each Rate will return a CarbonOffset object with the estimated grams of carbon emitted and price to offset the carbon emissions. To purchase the carbon offset, set `carbon_offset` to "true" when you purchase the Shipment.
 *
 * If no offset is available for a shipment when requested, a message "No carbon offset available for this shipment" is shown in the messages array.
 *
 * @see https://www.easypost.com/docs/api/node#brand
 */
export declare interface ICarbonOffset extends IObjectWithId<'CarbonOffset'> {
  /**
   * The currency of the offset price.
   */
  currency: string;

  /**
   * The price of the offset.
   */
  price: string;

  /**
   * The amount, in grams, of carbon offset by this purchase.
   */
  grams: number;
}

export declare class CarbonOffset implements ICarbonOffset {
  currency: string;
  grams: number;
  id: string;
  mode: 'test' | 'production';
  object: 'CarbonOffset';
  price: string;
}
