/**
 * When rating a Shipment or Pickup, some carriers may fail to generate rates.
 * These failures are returned as part of the Shipment or Pickup as part of their messages attribute, and follow a common object structure.
 *
 * It is important to note that the message value for any member of this list comes directly from the carrier, not from EasyPost.
 * This means that if you see an authentication or other non-shipping error here, it is not an issue between you and EasyPost, it is an issue between you and the carrier, or an issue with the given data.
 *
 * @see https://www.easypost.com/docs/api/node#message-object
 */
export declare interface IMessage {
  /**
   * the name of the carrier generating the error, e.g. "UPS"
   */
  carrier: string;

  /**
   * the category of error that occurred. Most frequently "rate_error"
   */
  type: string;

  /**
   * the string from the carrier explaining the problem
   */
  message: string;

  /**
   * the account id of the carrier. Useful if you have multiple accounts with the same carrier
   */
  carrier_account_id: string;
}
