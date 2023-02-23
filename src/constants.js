/**
 * A class containing constants used throughout the EasyPost Node.js client library.
 */
export default class Constants {
    /**
     * An array of carrier account types that support custom workflows.
     * @returns {string[]}
     */
    static get CARRIER_ACCOUNTS_WITH_CUSTOM_WORKFLOWS() {
        return ['FedexAccount', 'UpsAccount'];
    }

    /**
     * The template for the error message when an external API call fails.
     * @type {string}
     */
    static EXTERNAL_API_CALL_FAILED = 'Communication with %s failed, please try again later';

    /**
     * The template for the error message when encoding fails.
     * @type {string}
     */
    static ENCODED_ERROR = 'Encode error for %s';

    /**
     * The template for the error message when an invalid API key is provided.
     * @type {string}
     */
    static INVALID_API_KEY_TYPE = 'Invalid API key type.';

    /**
     * The template for the error message when an invalid parameter is provided.
     * @type {string}
     */
    static INVALID_PARAMETER = 'Invalid parameter: %s.';

    /**
     * The template for the error message when an invalid payment method is used.
     * @type {string}
     */
    static INVALID_PAYMENT = 'The chosen payment method is not a credit card. Please try again.';

    /**
     * The template for the error message when an invalid webhook signature is found.
     * @type {string}
     */
    static INVALID_WEBHOOK_SIGNATURE = 'Webhook does not contain a valid HMAC signature.';

    /**
     * The template for the error message when a missing required parameter is detected.
     * @type {string}
     */
    static MISSING_REQUIRED_PARAMETER = 'Missing required parameter: %s.';

    /**
     * The template for the error message when no object is found.
     * @type {string}
     */
    static NO_OBJECT_FOUND = 'No %s found.';

    /**
     * The template for the error message when no payment methods are found.
     * @type {string}
     */
    static NO_PAYMENT_METHODS =
        'No payment methods are set up. Please add a payment method and try again.';

    /**
     * The template for the error message when the API does not return error details.
     * @type {string}
     */
    static API_DID_NOT_RETURN_ERROR_DETAILS = 'API did not return error details.';

    /**
     * The template for the error message when a webhook does not match the expected webhook secret.
     * @type {string}
     */
    static WEBHOOK_DOES_NOT_MATCH =
        'Webhook received did not originate from EasyPost or had a webhook secret mismatch.';
}
