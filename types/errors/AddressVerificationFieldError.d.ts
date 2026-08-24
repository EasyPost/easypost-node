import { TErrorCode } from './ErrorCode';

/**
 * @see https://docs.easypost.com/docs/errors#addressverificationfielderror-object
 */
export declare interface IAddressVerificationFieldError {
  /**
   * Machine readable description of the problem
   */
  code: TErrorCode;

  /**
   * Field of the request that the error describes
   */
  field: string;

  /**
   * Human readable description of the problem
   */
  message: string;

  /**
   * Occasional insight on how to correct the error
   */
  suggestion?: string;
}
