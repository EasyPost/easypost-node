import Constants from '../constants';
import baseService from './base_service';

export default (easypostClient) =>
  class CarrierAccountService extends baseService(easypostClient) {
    static _name = 'CarrierAccount';

    static _url = 'carrier_accounts';

    static key = 'carrier_account';

    /**
     * Create a carrier account.
     * @param {object} params
     * @returns {CarrierAccount}
     */
    static async create(params) {
      const carrierAccountType = params.type;

      if (!carrierAccountType) {
        throw new Error('CarrierAccount type is not set'); // this throw is caught by the catch block below, never returned to the user
      }

      const wrappedParams = { carrier_account: params };

      const endpoint = this.selectCarrierAccountCreationEndpoint(carrierAccountType);

      return this._create(endpoint, wrappedParams);
    }

    /**
     * Update a carrier account.
     * @param {string} id
     * @param {object} params
     * @returns {CarrierAccount}
     */
    static async update(id, params) {
      try {
        const response = await easypostClient.patch(`${this._url}/${id}`, {
          carrier_account: params,
        });

        return this.convertToEasyPostObject(response.body);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Delete a CarrierAccount.
     * @param {string} id
     * @returns {Promise|Promise<never>}
     */
    static async delete(id) {
      try {
        await easypostClient.del(`${this._url}/${id}`);
        return Promise.resolve();
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Returns the correct carrier_account endpoint when creating a record based on the type.
     * @param {string} carrierAccountType
     * @returns {string}
     */
    static selectCarrierAccountCreationEndpoint(carrierAccountType) {
      if (Constants.CARRIER_ACCOUNTS_WITH_CUSTOM_WORKFLOWS.includes(carrierAccountType)) {
        return 'carrier_accounts/register';
      }
      return 'carrier_accounts';
    }

    /**
     * Retrieve a list of all carrier accounts associated with the API key.
     * @param {object} params
     * @returns {CarrierAccount[]}
     */
    static async all(params = {}) {
      return this._all(this._url, params);
    }

    /**
     * Retrieve a carrier account from the API.
     * @param {string} id
     * @returns {CarrierAccount}
     */
    static async retrieve(id) {
      const url = `${this._url}/${id}`;
      return this._retrieve(url);
    }
  };
