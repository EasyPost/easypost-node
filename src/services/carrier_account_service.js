import util from 'util';

import Constants from '../constants';
import InvalidParameterError from '../errors/general/invalid_parameter_error';
import baseService from './base_service';

export default (easypostClient) =>
  /**
   * The CarrierAccountService class provides methods for interacting with EasyPost @{link CarrierAccount} objects.
   * @param {EasyPostClient} easypostClient - The pre-configured EasyPostClient instance to use for API requests with this service.
   */
  class CarrierAccountService extends baseService(easypostClient) {
    /**
     * Create a {@link CarrierAccount carrier account}.
     * See {@link https://docs.easypost.com/docs/carrier-accounts#create-a-carrieraccount EasyPost API Documentation} for more information.
     * @param {Object} params - Parameters for the carrier account to be created.
     * @returns {CarrierAccount} - The created carrier account.
     */
    static async create(params) {
      const carrierAccountType = params.type;

      if (!carrierAccountType) {
        throw new InvalidParameterError({
          message: util.format(Constants.MISSING_REQUIRED_PARAMETER, 'CarrierAccount type'),
        });
      }

      const endpoint = this._selectCarrierAccountCreationEndpoint(carrierAccountType);
      const wrappedParams = this._wrapCarrierAccountParams(carrierAccountType, params);

      return this._create(endpoint, wrappedParams);
    }

    /**
     * Update a {@link CarrierAccount carrier account}.
     * See {@link https://docs.easypost.com/docs/carrier-accounts#update-a-carrieraccount EasyPost API Documentation} for more information.
     * @param {string} id - The id of the carrier account to be updated.
     * @param {Object} params - Parameters for the carrier account to be updated.
     * @returns {CarrierAccount} - The updated carrier account.
     */
    static async update(id, params) {
      const wrappedParams = { carrier_account: params };

      try {
        const response = await easypostClient._patch(`carrier_accounts/${id}`, wrappedParams);

        return this._convertToEasyPostObject(response.body, wrappedParams);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Delete a {@link CarrierAccount carrier account}.
     * See {@link https://docs.easypost.com/docs/carrier-accounts#delete-a-carrieraccount EasyPost API Documentation} for more information.
     * @param {string} id - The id of the carrier account to be deleted.
     * @returns {Promise|Promise<never>} - A promise that resolves when the carrier account has been deleted.
     */
    static async delete(id) {
      const url = `carrier_accounts/${id}`;

      try {
        await easypostClient._delete(url);

        return Promise.resolve();
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Returns the correct carrier_account endpoint when creating a record based on the type.
     * @private
     * @param {string} carrierAccountType - The type of carrier account to be created.
     * @returns {string} - The endpoint to be used for the carrier account creation request.
     */
    static _selectCarrierAccountCreationEndpoint(carrierAccountType) {
      if (Constants.CARRIER_ACCOUNTS_WITH_CUSTOM_CREATE_WORKFLOWS.includes(carrierAccountType)) {
        return 'carrier_accounts/register';
      } else if (Constants.CARRIER_ACCOUNT_TYPES_WITH_CUSTOM_OAUTH.includes(carrierAccountType)) {
        return 'carrier_accounts/register_oauth';
      }

      return 'carrier_accounts';
    }

    /**
     * Wraps the carrier account parameters in the correct format based on the type.
     * @private
     * @param {string} carrierAccountType - The type of carrier account to be created.
     * @param {Object} params - The parameters for the carrier account to be created.
     * @returns {Object} - The wrapped carrier account parameters.
     */
    static _wrapCarrierAccountParams(carrierAccountType, params) {
      if (Constants.CARRIER_ACCOUNT_TYPES_WITH_CUSTOM_OAUTH.includes(carrierAccountType)) {
        return { carrier_account_oauth_registrations: params };
      }

      return { carrier_account: params };
    }

    /**
     * Retrieve all {@link CarrierAccount carrier accounts} associated with the current authenticated user.
     * See {@link https://docs.easypost.com/docs/carrier-accounts#retrieve-all-carrieraccounts EasyPost API Documentation} for more information.
     * @param {Object} [params] - Parameters to filter the list of carrier accounts.
     * @returns {Object} - An object containing a list of {@link CarrierAccount carrier accounts} and pagination information.
     */
    static async all(params = {}) {
      const url = 'carrier_accounts';

      return this._all(url, params);
    }

    /**
     * Retrieve a {@link CarrierAccount carrier account} by its ID.
     * See {@link https://docs.easypost.com/docs/carrier-accounts#retrieve-a-carrieraccount EasyPost API Documentation} for more information.
     * @param {string} id - The ID of the carrier account to retrieve.
     * @returns {CarrierAccount} - The retrieved carrier account.
     */
    static async retrieve(id) {
      const url = `carrier_accounts/${id}`;

      return this._retrieve(url);
    }
  };
