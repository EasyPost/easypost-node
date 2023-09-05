import Utils from './utils/util';

/**
 * A class containing constants used throughout the EasyPost Node.js client library.
 */
export default class Constants {
  static get CARRIER_ACCOUNTS_WITH_CUSTOM_WORKFLOWS() {
    return ['FedexAccount', 'FedexSmartpostAccount', 'UpsAccount'];
  }
  static EXTERNAL_API_CALL_FAILED = 'Communication with %s failed, please try again later';
  static INVALID_API_KEY_TYPE = 'Invalid API key type.';
  static INVALID_PARAMETER = 'Invalid parameter: %s.';
  static INVALID_PAYMENT = 'The chosen payment method is not a credit card. Please try again.';
  static INVALID_WEBHOOK_SIGNATURE = 'Webhook does not contain a valid HMAC signature.';
  static MISSING_REQUIRED_PARAMETER = 'Missing required parameter: %s.';
  static NO_OBJECT_FOUND = 'No %s found.';
  static NO_PAYMENT_METHODS =
    'No payment methods are set up. Please add a payment method and try again.';
  static API_DID_NOT_RETURN_ERROR_DETAILS = 'API did not return error details.';
  static WEBHOOK_DOES_NOT_MATCH =
    'Webhook received did not originate from EasyPost or had a webhook secret mismatch.';
  static END_OF_PAGINATION = 'There are no more pages to retrieve.';
  static ERROR_DESERIALIZATION = 'Error deserializing JSON response';
  static Utils = new Utils();
}
