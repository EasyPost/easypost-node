import { IFieldError } from '../../utils/errors';
import { IVerificationDetails } from './VerificationDetails';

/**
 * @see https://www.easypost.com/docs/api/node#verification-object
 */
export type IVerification = {
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
};
