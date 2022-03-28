/**
 * @see https://www.easypost.com/docs/api/node#verification_details-object
 */
export declare interface IVerificationDetails {
  latitude: number;
  longitude: number;

  /**
   * The time zone the address is located in, IE: America/Los_Angeles
   */
  time_zone: string;
}
