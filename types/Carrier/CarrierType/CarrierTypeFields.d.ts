import { ICarrierTypeCredentials } from './CarrierTypeCredentials';

/**
 * @see https://www.easypost.com/docs/api/node#carrier-type-fields-object
 */
export declare interface ICarrierTypeFields {
  /**
   * If this key is present with the value of true, no other attributes are needed for CarrierAccount creation
   */
  auto_link: boolean;

  /**
   * If this key is present with the value of true, CarrierAccount creation of this type requires extra work not handled by the CarrierAccount standard API
   */
  custom_workflow: boolean;

  /**
   * If this object is present, required attribute names and their metadata are presented inside
   */
  credentials: ICarrierTypeCredentials;

  /**
   * If this object is present, it contains attribute names and metadata just as the credentials object.
   * It is not required for CarrierAccount creation if you do not plan on using the carrier account for test mode
   */
  test_credentials: ICarrierTypeCredentials;
}
