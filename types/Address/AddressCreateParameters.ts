import { ParametersToOmitOnCreate } from '../utils';
import { IAddress } from './Address';

/**
 * @see https://www.easypost.com/docs/api/node#create-and-verify-addresses
 */
export declare interface IAddressCreateParameters
  extends Omit<IAddress, ParametersToOmitOnCreate | 'verifications'> {
  /**
   * The verifications to perform when creating.
   * verify_strict takes precedence.
   * true will perform both delivery and zip code.
   */
  verify?: boolean | null;

  /**
   * The verifications to perform when creating.
   * The failure of any of these verifications causes the whole request to fail.
   * true will perform both delivery and zip code.
   */
  verify_strict?: boolean | null;
}
