import EasyPostClient from '../easypost';
import BetaRateService from './beta_rate_service';
import BetaReferralCustomerService from './beta_referral_customer_service';

export const DEFAULT_BASE_URL = 'https://api.easypost.com/beta/';

export const SERVICES = {
  BetaReferralCustomerService,
  BetaRateService,
};

export default class BetaClient extends EasyPostClient {
  constructor(key, options = {}) {
    super(key, options);
    const { baseUrl } = options;
    this.baseUrl = baseUrl || DEFAULT_BASE_URL;

    this._attachServices(SERVICES);
  }
}
