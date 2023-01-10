import BetaPaymentRefund, {
  propTypes as betaPaymentRefundTypes,
} from './resources/beta_payment_refund';
import Referral, { propTypes as referralPropTypes } from './resources/referral';

import API from '../easypost';

export const DEFAULT_BASE_URL = 'https://api.easypost.com/beta/';

export const RESOURCES = {
  BetaPaymentRefund,
  Referral,
};

export const PROP_TYPES = {
  betaPaymentRefundTypes,
  referralPropTypes,
};

export default class BetaAPI extends API {
  constructor(key, options = {}) {
    super(key, options);
    const { baseUrl } = options;
    this.baseUrl = baseUrl || DEFAULT_BASE_URL;

    this.use(RESOURCES);
  }
}
