/**
 * @see https://docs.easypost.com/docs/addresses#verificationdetails-object
 */
export declare interface IVerificationDetails {
  /**
   * The latitude of an Address.
   */
  latitude: number;

  /**
   * The longitude of an Address.
   */
  longitude: number;

  /**
   * The time zone the address is located in, IE: America/Los_Angeles
   */
  time_zone: string;
}
