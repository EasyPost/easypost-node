import EasyPostClient from '../easypost';
import BetaReferralCustomerService from './beta_referral_customer_service';

export const DEFAULT_BASE_URL = 'https://api.easypost.com/beta/';

export const SERVICES = {
  BetaReferralCustomerService,
};

export default class BetaClient extends EasyPostClient {
  constructor(key, options = {}) {
    super(key, options);
    const { baseUrl } = options;
    this.baseUrl = baseUrl || DEFAULT_BASE_URL;

    this.attachServices(SERVICES);
  }
}
