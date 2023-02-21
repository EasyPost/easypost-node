import Constants from '../constants';
import baseService from './base_service';

export default (easypostClient) =>
  class CarrierAccountService extends baseService(easypostClient) {
    static #name = 'CarrierAccount';

    static #url = 'carrier_accounts';

    static #key = 'carrier_account';

    /**
     * Create a carrier account.
     * @param {object} params
     * @returns {CarrierAccount}
     */
    static async create(params) {
      const carrierAccountType = params.type;

      if (!carrierAccountType) {
        throw new Error('CarrierAccount type is not set');
      }

      const endpoint = this._selectCarrierAccountCreationEndpoint(carrierAccountType);

      const wrappedParams = { carrier_account: params };

      return this._create(endpoint, wrappedParams);
    }

    /**
     * Update a carrier account.
     * @param {string} id
     * @param {object} params
     * @returns {CarrierAccount}
     */
    static async update(id, params) {
      const url = `${this.#url}/${id}`;
      const wrappedParams = {
        carrier_account: params,
      };

      try {
        const response = await easypostClient.patch(url, wrappedParams);

        return this._convertToEasyPostObject(response.body);
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
      const url = `${this.#url}/${id}`;

      try {
        await easypostClient.del(url);

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
    static _selectCarrierAccountCreationEndpoint(carrierAccountType) {
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
      const url = this.#url;

      return this._all(url, params);
    }

    /**
     * Retrieve a carrier account from the API.
     * @param {string} id
     * @returns {CarrierAccount}
     */
    static async retrieve(id) {
      const url = `${this.#url}/${id}`;

      return this._retrieve(url);
    }
  };
