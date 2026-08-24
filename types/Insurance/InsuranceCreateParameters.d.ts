import { IAddress } from '../Address';

export declare interface IInsuranceCreateParameters {
  reference?: string | null;
  to_address: IAddress | string;
  from_address: IAddress | string;

  /**
   * The carrier associated with the tracking_code you provided.
   * The carrier will get auto-detected if none is provided
   */
  carrier?: string | null;

  /**
   * The tracking code associated with the non-EasyPost-purchased package you'd like to insure.
   */
  tracking_code: string;

  /**
   * The USD value of contents you would like to insure.
   * Currently the maximum is $5000
   *
   * @example 100.00
   */
  amount: string;
}
