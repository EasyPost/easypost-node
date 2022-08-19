import Referral, { propTypes as referralPropTypes } from './resources/referral';

import API from '../easypost';

export const DEFAULT_BASE_URL = 'https://api.easypost.com/beta/';

export const RESOURCES = {
  Referral,
};

export const PROP_TYPES = {
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
