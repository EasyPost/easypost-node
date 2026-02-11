import { v4 as uuid } from 'uuid';

import baseService from './base_service';

export default (easypostClient) =>
  /**
   * The FedExRegistrationService class provides methods for registering FedEx carrier accounts with MFA.
   * @param {EasyPostClient} easypostClient - The pre-configured EasyPostClient instance to use for API requests with this service.
   */
  class FedExRegistrationService extends baseService(easypostClient) {
    /**
     * Register the billing address for a FedEx account.
     * Advanced method for custom parameter structures.
     * @param {string} fedexAccountNumber - The FedEx account number.
     * @param {Object} params - Map of parameters.
     * @returns {Object} - FedExAccountValidationResponse object with next steps (PIN or invoice validation).
     */
    static async registerAddress(fedexAccountNumber, params) {
      const wrappedParams = this._wrapAddressValidation(params);
      const endpoint = `fedex_registrations/${fedexAccountNumber}/address`;

      try {
        const response = await easypostClient._post(endpoint, wrappedParams);
        return this._convertToEasyPostObject(response.body, params);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Request a PIN for FedEx account verification.
     * @param {string} fedexAccountNumber - The FedEx account number.
     * @param {string} pinMethodOption - The PIN delivery method: "SMS", "CALL", or "EMAIL".
     * @returns {Object} - FedExRequestPinResponse object confirming PIN was sent.
     */
    static async requestPin(fedexAccountNumber, pinMethodOption) {
      const wrappedParams = {
        pin_method: {
          option: pinMethodOption,
        },
      };
      const endpoint = `fedex_registrations/${fedexAccountNumber}/pin`;

      try {
        const response = await easypostClient._post(endpoint, wrappedParams);
        return this._convertToEasyPostObject(response.body, wrappedParams);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Validate the PIN entered by the user for FedEx account verification.
     * @param {string} fedexAccountNumber - The FedEx account number.
     * @param {Object} params - Map of parameters.
     * @returns {Object} - FedExAccountValidationResponse object.
     */
    static async validatePin(fedexAccountNumber, params) {
      const wrappedParams = this._wrapPinValidation(params);
      const endpoint = `fedex_registrations/${fedexAccountNumber}/pin/validate`;

      try {
        const response = await easypostClient._post(endpoint, wrappedParams);
        return this._convertToEasyPostObject(response.body, params);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Submit invoice information to complete FedEx account registration.
     * @param {string} fedexAccountNumber - The FedEx account number.
     * @param {Object} params - Map of parameters.
     * @returns {Object} - FedExAccountValidationResponse object.
     */
    static async submitInvoice(fedexAccountNumber, params) {
      const wrappedParams = this._wrapInvoiceValidation(params);
      const endpoint = `fedex_registrations/${fedexAccountNumber}/invoice`;

      try {
        const response = await easypostClient._post(endpoint, wrappedParams);
        return this._convertToEasyPostObject(response.body, params);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Wraps address validation parameters and ensures the "name" field exists.
     * If not present, generates a UUID (with hyphens removed) as the name.
     * @private
     * @param {Object} params - The original parameters map.
     * @returns {Object} - A new map with properly wrapped address_validation and easypost_details.
     */
    static _wrapAddressValidation(params) {
      const wrappedParams = {};

      if (params.address_validation) {
        const addressValidation = { ...params.address_validation };
        this._ensureNameField(addressValidation);
        wrappedParams.address_validation = addressValidation;
      }

      if (params.easypost_details) {
        wrappedParams.easypost_details = params.easypost_details;
      }

      return wrappedParams;
    }

    /**
     * Wraps PIN validation parameters and ensures the "name" field exists.
     * If not present, generates a UUID (with hyphens removed) as the name.
     * @private
     * @param {Object} params - The original parameters map.
     * @returns {Object} - A new map with properly wrapped pin_validation and easypost_details.
     */
    static _wrapPinValidation(params) {
      const wrappedParams = {};

      if (params.pin_validation) {
        const pinValidation = { ...params.pin_validation };
        this._ensureNameField(pinValidation);
        wrappedParams.pin_validation = pinValidation;
      }

      if (params.easypost_details) {
        wrappedParams.easypost_details = params.easypost_details;
      }

      return wrappedParams;
    }

    /**
     * Wraps invoice validation parameters and ensures the "name" field exists.
     * If not present, generates a UUID (with hyphens removed) as the name.
     * @private
     * @param {Object} params - The original parameters map.
     * @returns {Object} - A new map with properly wrapped invoice_validation and easypost_details.
     */
    static _wrapInvoiceValidation(params) {
      const wrappedParams = {};

      if (params.invoice_validation) {
        const invoiceValidation = { ...params.invoice_validation };
        this._ensureNameField(invoiceValidation);
        wrappedParams.invoice_validation = invoiceValidation;
      }

      if (params.easypost_details) {
        wrappedParams.easypost_details = params.easypost_details;
      }

      return wrappedParams;
    }

    /**
     * Ensures the "name" field exists in the provided map.
     * If not present, generates a UUID (with hyphens removed) as the name.
     * This follows the pattern used in the web UI implementation.
     * @private
     * @param {Object} map - The map to ensure the "name" field in.
     */
    static _ensureNameField(map) {
      if (!map.name || map.name === null) {
        const uuidValue = uuid().replace(/-/g, '');
        map.name = uuidValue;
      }
    }
  };
