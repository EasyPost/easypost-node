import { v4 as uuid } from 'uuid';
import baseService from './base_service';
import type EasyPostClient from '../easypost';

type IFedExAccountValidationResponse = Record<string, unknown>;
type IFedExRequestPinResponse = Record<string, unknown>;

type FedExValidationMap = Record<string, unknown> & { name?: string | null };
type FedExParams = Record<string, unknown> & {
  address_validation?: FedExValidationMap;
  pin_validation?: FedExValidationMap;
  invoice_validation?: FedExValidationMap;
  easypost_details?: Record<string, unknown>;
};

export default (easypostClient: EasyPostClient) =>
  /**
   * The FedExRegistrationService class provides methods for registering FedEx carrier accounts with MFA.
   * @param {EasyPostClient} easypostClient - The pre-configured EasyPostClient instance to use for API requests with this service.
   */
  class FedExRegistrationService extends baseService(easypostClient) {
    /**
     * Register the billing address for a FedEx account.
     * @param {string} fedexAccountNumber - The FedEx account number.
     * @param {Object} params - Map of parameters.
     * @returns {Object}
     */
    static async registerAddress(
      fedexAccountNumber: string,
      params: FedExParams,
    ): Promise<IFedExAccountValidationResponse> {
      const wrappedParams = this._wrapAddressValidation(params);
      const endpoint = `fedex_registrations/${fedexAccountNumber}/address`;

      try {
        const response = await easypostClient._post(endpoint, wrappedParams);
        return this._convertToEasyPostObject(response.body, wrappedParams);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Request a PIN for FedEx account verification.
     * @param {string} fedexAccountNumber - The FedEx account number.
     * @param {string} pinMethodOption - The PIN delivery method: "SMS", "CALL", or "EMAIL".
     * @param {Object} params - Map of parameters.
     * @returns {Object}
     */
    static async requestPin(
      fedexAccountNumber: string,
      pinMethodOption: string,
      params: FedExParams,
    ): Promise<IFedExRequestPinResponse> {
      const wrappedParams = this._wrapPinValidation(params);
      wrappedParams.pin_method = {
        option: pinMethodOption,
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
     * @returns {Object}
     */
    static async validatePin(
      fedexAccountNumber: string,
      params: FedExParams,
    ): Promise<IFedExAccountValidationResponse> {
      const wrappedParams = this._wrapPinValidation(params);
      const endpoint = `fedex_registrations/${fedexAccountNumber}/pin/validate`;

      try {
        const response = await easypostClient._post(endpoint, wrappedParams);
        return this._convertToEasyPostObject(response.body, wrappedParams);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Submit invoice information to complete FedEx account registration.
     * @param {string} fedexAccountNumber - The FedEx account number.
     * @param {Object} params - Map of parameters.
     * @returns {Object}
     */
    static async submitInvoice(
      fedexAccountNumber: string,
      params: FedExParams,
    ): Promise<IFedExAccountValidationResponse> {
      const wrappedParams = this._wrapInvoiceValidation(params);
      const endpoint = `fedex_registrations/${fedexAccountNumber}/invoice`;

      try {
        const response = await easypostClient._post(endpoint, wrappedParams);
        return this._convertToEasyPostObject(response.body, wrappedParams);
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
    static _wrapAddressValidation(params: FedExParams): Record<string, unknown> {
      const wrappedParams: Record<string, unknown> = {};

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
    static _wrapPinValidation(params: FedExParams): Record<string, unknown> {
      const wrappedParams: Record<string, unknown> = {};

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
    static _wrapInvoiceValidation(params: FedExParams): Record<string, unknown> {
      const wrappedParams: Record<string, unknown> = {};

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
    static _ensureNameField(map: FedExValidationMap): void {
      if (!map.name || map.name === null) {
        const uuidValue = uuid().replace(/-/g, '');
        map.name = uuidValue;
      }
    }
  };
