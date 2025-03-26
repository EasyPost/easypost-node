import { IFieldError } from '../errors';
import { IVerificationDetails } from './VerificationDetails';

/**
 * @see https://docs.easypost.com/docs/addresses#verification-object
 */
export declare interface IVerification {
  /**
   * The success of the verification
   */
  success: boolean;

  /**
   * All errors that caused the verification to fail
   */
  errors: IFieldError[];

  /**
   * Extra data related to the verification
   */
  details: IVerificationDetails;
}
