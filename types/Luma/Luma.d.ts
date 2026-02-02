/**
 * Interface representing an EasyPost Luma promise object.
 *
 * @see https://docs.easypost.com/docs/luma
 */
export declare interface ILumaPromise {
  /** Always returns "LumaInfo". */
  object: string;

  /** The delivery date and time commitment. */
  delivery_datetime: string | null;

  /** The delivery date commitment. */
  delivery_date: string | null;

  /** The pickup date and time commitment. */
  pickup_datetime: string | null;

  /** The pickup date commitment. */
  pickup_date: string | null;

  /** The carrier account used for the promise. */
  carrier_account_id: string | null;

  /** The service level used for the promise. */
  service: string | null;

  /** The carrier used for the promise. */
  carrier: string | null;
}

/**
 * The Luma class interacts with the Luma API to provide service recommendations.
 *
 * @see https://docs.easypost.com/docs/luma
 */
export declare class Luma {
  /**
   * Get service recommendations from Luma that meet the criteria of your ruleset.
   *
   * @see https://docs.easypost.com/docs/luma
   *
   * @param params - The parameters to get a Luma promise with (shipment parameters).
   * @returns {Promise<ILumaPromise>} - An object containing the Luma promise.
   */
  static getPromise(params: object): Promise<ILumaPromise>;
}
