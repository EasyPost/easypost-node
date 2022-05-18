import Referral, { propTypes as referralPropTypes } from './resources/referral';
import EndShipper, { propTypes as endShipperPropTypes } from './resources/end_shipper';

import API from '../easypost';

export const DEFAULT_BASE_URL = 'https://api.easypost.com/beta/';

export const RESOURCES = {
  EndShipper,
  Referral,
};

export const PROP_TYPES = {
  referralPropTypes,
  endShipperPropTypes,
};

export default class BetaAPI extends API {
  constructor(key, options = {}) {
    super(key, options);
    const { baseUrl } = options;
    this.baseUrl = baseUrl || DEFAULT_BASE_URL;

    this.use(RESOURCES);
  }
}
