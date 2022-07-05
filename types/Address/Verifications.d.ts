import { IVerification } from './Verification';

/**
 * @see https://www.easypost.com/docs/api/node#verifications-object
 */
export declare interface IVerifications {
  /**
   * Only applicable to US addresses - checks and sets the ZIP+4
   */
  zip4: IVerification;
  /**
   * Checks that the address is deliverable and makes minor corrections to spelling/format. US addresses will also have their "residential" status checked and set.
   */
  delivery: IVerification;
}
