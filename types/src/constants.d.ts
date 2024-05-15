import Utils from './utils/util';
/**
 * A class containing constants used throughout the EasyPost Node.js client library.
 */
export default class Constants {
  static get CARRIER_ACCOUNTS_WITH_CUSTOM_WORKFLOWS(): string[];
  static EXTERNAL_API_CALL_FAILED: string;
  static INVALID_API_KEY_TYPE: string;
  static INVALID_PARAMETER: string;
  static INVALID_PAYMENT: string;
  static INVALID_WEBHOOK_SIGNATURE: string;
  static MISSING_REQUIRED_PARAMETER: string;
  static NO_OBJECT_FOUND: string;
  static NO_PAYMENT_METHODS: string;
  static API_DID_NOT_RETURN_ERROR_DETAILS: string;
  static WEBHOOK_DOES_NOT_MATCH: string;
  static END_OF_PAGINATION: string;
  static ERROR_DESERIALIZATION: string;
  static Utils: Utils;
}
