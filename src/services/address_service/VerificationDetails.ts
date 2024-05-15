/**
 * @see https://www.easypost.com/docs/api/node#verification_details-object
 */
export type IVerificationDetails = {
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
};
