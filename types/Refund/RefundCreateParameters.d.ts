/**
 * @see https://docs.easypost.com/docs/refunds#create-a-refund
 */
export declare interface IRefundCreateParameters {
  /**
   * The carrier to request a refund from
   */
  carrier: string;

  /**
   * A list of tracking codes to request refunds for. Even for a single tracking code, it needs to be submitted as a list.
   */
  tracking_codes: string[];
}
