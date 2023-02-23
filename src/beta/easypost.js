import EasyPostClient from '../easypost';
import BetaRateService from './beta_rate_service';
import BetaReferralCustomerService from './beta_referral_customer_service';

/**
 * The default base URL for beta features of the EasyPost API.
 * @type {string}
 */
export const DEFAULT_BASE_URL = 'https://api.easypost.com/beta/';

/**
 * The services available for the beta client.
 * @type {Map}
 */
export const SERVICES = {
    BetaReferralCustomerService,
    BetaRateService,
};

/**
 * The client used to access beta services of the EasyPost API.
 * This client is configured to use the beta version of the EasyPost API.
 * @extends EasyPostClient
 * @param {string} key The API key to use for API requests made by this client.
 * @param {Object} [options] Additional options to use for the underlying HTTP client (e.g. superagent, middleware, proxy configuration).
 */
export default class BetaClient extends EasyPostClient {
    constructor(key, options = {}) {
        super(key, options);
        const {baseUrl} = options;
        this.baseUrl = baseUrl || DEFAULT_BASE_URL;

        this._attachServices(SERVICES);
    }
}
