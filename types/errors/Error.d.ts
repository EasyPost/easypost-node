import { TErrorCode } from './ErrorCode';
import { IFieldError } from './FieldError';

/**
 * In the event of a client or server error, the response will contain the standard 4xx or 5xx respectively, accompanied by a well-formed JSON body describing the issue, e.g., a required field was omitted, a purchase failed, etc.
 *
 * Each client library will encapsulate these errors and raise an exception, in addition to other exceptional cases, such as network failures.
 * It is recommended to handle exceptions gracefully and to report any issues to support@easypost.com.
 *
 * @see https://www.easypost.com/docs/api/node#error-object
 */
export declare interface IError {
  /**
   * Machine readable description of the problem
   */
  code: TErrorCode;

  /**
   * Human readable description of the problem
   */
  message: string;

  /**
   * Breakdown of errors for specific fields in the request
   */
  errors: IFieldError[];
}
