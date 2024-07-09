import baseService from './base_service';
import Constants from '../constants';
import InvalidParameterError from '../errors/general/invalid_parameter_error';
import InvalidRequestError from '../errors/api/invalid_request_error';

const util = require('util');

export default (easypostClient) =>
  /**
   * The CarrierAccountService class provides methods for interacting with EasyPost @{link CarrierAccount} objects.
   * @param {EasyPostClient} easypostClient - The pre-configured EasyPostClient instance to use for API requests with this service.
   */
  class CarrierAccountService extends baseService(easypostClient) {
    /**
     * Create a {@link CarrierAccount carrier account}.
     * See {@link https://www.easypost.com/docs/api/node#create-a-carrier-account EasyPost API Documentation} for more information.
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
      const wrappedParams = this._wrapCarrierAccountCreationParams(carrierAccountType, params);

      return this._create(endpoint, wrappedParams);
    }

    /**
     * Update a {@link CarrierAccount carrier account}.
     * See {@link https://www.easypost.com/docs/api/node#update-a-carrieraccount EasyPost API Documentation} for more information.
     * @param {string} id - The id of the carrier account to be updated.
     * @param {Object} params - Parameters for the carrier account to be updated.
     * @returns {CarrierAccount} - The updated carrier account.
     */
    static async update(id, params) {
      const carrierAccount = await this.retrieve(id);

      if (!carrierAccount) {
        throw new InvalidRequestError({
          message: util.format(Constants.NO_OBJECT_FOUND, 'carrier account'),
        });
      }

      const carrierAccountType = carrierAccount.type;

      const endpoint = this._selectCarrierAccountUpdateEndpoint(carrierAccountType, id);
      const wrappedParams = this._wrapCarrierAccountUpdateParams(carrierAccountType, params);

      try {
        const response = await easypostClient._patch(endpoint, wrappedParams);

        return this._convertToEasyPostObject(response.body, wrappedParams);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Delete a {@link CarrierAccount carrier account}.
     * See {@link https://www.easypost.com/docs/api/node#delete-a-carrier-account EasyPost API Documentation} for more information.
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
      }
      if (Constants.UPS_OAUTH_CARRIER_TYPES.includes(carrierAccountType)) {
        return 'ups_oauth_registrations';
      }
      return 'carrier_accounts';
    }

    /**
     * Wraps the carrier account creation parameters in the correct format based on the type.
     * @private
     * @param {string} carrierAccountType - The type of carrier account to be created.
     * @param {Object} params - The parameters for the carrier account to be created.
     * @returns {Object} - The wrapped carrier account creation parameters.
     */
    static _wrapCarrierAccountCreationParams(carrierAccountType, params) {
      if (Constants.UPS_OAUTH_CARRIER_TYPES.includes(carrierAccountType)) {
        return { ups_oauth_registrations: params };
      }
      return { carrier_account: params };
    }

    /**
     * Returns the correct carrier_account endpoint when updating a record based on the type.
     * @private
     * @param {string} carrierAccountType - The type of carrier account to be updated.
     * @param {string} carrierAccountId - The ID of the carrier account to be updated.
     * @returns {string} - The endpoint to be used for the carrier account update request.
     */
    static _selectCarrierAccountUpdateEndpoint(carrierAccountType, carrierAccountId) {
      if (Constants.UPS_OAUTH_CARRIER_TYPES.includes(carrierAccountType)) {
        return `ups_oauth_registrations/${carrierAccountId}`;
      }
      return `carrier_accounts/${carrierAccountId}`;
    }

    /**
     * Wraps the carrier account update parameters in the correct format based on the type.
     * @private
     * @param {string} carrierAccountType - The type of carrier account to be updated.
     * @param {Object} params - The parameters for the carrier account to be updated.
     * @returns {Object} - The wrapped carrier account update parameters.
     */
    static _wrapCarrierAccountUpdateParams(carrierAccountType, params) {
      if (Constants.UPS_OAUTH_CARRIER_TYPES.includes(carrierAccountType)) {
        return { ups_oauth_registrations: params };
      }
      return { carrier_account: params };
    }

    /**
     * Retrieve all {@link CarrierAccount carrier accounts} associated with the current authenticated user.
     * See {@link https://www.easypost.com/docs/api/node#list-all-carrier-accounts EasyPost API Documentation} for more information.
     * @param {Object} [params] - Parameters to filter the list of carrier accounts.
     * @returns {Object} - An object containing a list of {@link CarrierAccount carrier accounts} and pagination information.
     */
    static async all(params = {}) {
      const url = 'carrier_accounts';

      return this._all(url, params);
    }

    /**
     * Retrieve a {@link CarrierAccount carrier account} by its ID.
     * See {@link https://www.easypost.com/docs/api/node#retrieve-a-carrieraccount EasyPost API Documentation} for more information.
     * @param {string} id - The ID of the carrier account to retrieve.
     * @returns {CarrierAccount} - The retrieved carrier account.
     */
    static async retrieve(id) {
      const url = `carrier_accounts/${id}`;

      return this._retrieve(url);
    }
  };
