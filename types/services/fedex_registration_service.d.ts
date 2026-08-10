type FedExValidationMap = Record<string, unknown> & {
    name?: string | null;
};
type FedExParams = Record<string, unknown> & {
    address_validation?: FedExValidationMap;
    pin_validation?: FedExValidationMap;
    invoice_validation?: FedExValidationMap;
    easypost_details?: Record<string, unknown>;
};
declare const _default: (easypostClient: any) => {
    new (): {};
    /**
     * Register the billing address for a FedEx account.
     * @param {string} fedexAccountNumber - The FedEx account number.
     * @param {Object} params - Map of parameters.
     * @returns {Object}
     */
    registerAddress(fedexAccountNumber: string, params: FedExParams): Promise<unknown>;
    /**
     * Request a PIN for FedEx account verification.
     * @param {string} fedexAccountNumber - The FedEx account number.
     * @param {string} pinMethodOption - The PIN delivery method: "SMS", "CALL", or "EMAIL".
     * @param {Object} params - Map of parameters.
     * @returns {Object}
     */
    requestPin(fedexAccountNumber: string, pinMethodOption: string, params: FedExParams): Promise<unknown>;
    /**
     * Validate the PIN entered by the user for FedEx account verification.
     * @param {string} fedexAccountNumber - The FedEx account number.
     * @param {Object} params - Map of parameters.
     * @returns {Object}
     */
    validatePin(fedexAccountNumber: string, params: FedExParams): Promise<unknown>;
    /**
     * Submit invoice information to complete FedEx account registration.
     * @param {string} fedexAccountNumber - The FedEx account number.
     * @param {Object} params - Map of parameters.
     * @returns {Object}
     */
    submitInvoice(fedexAccountNumber: string, params: FedExParams): Promise<unknown>;
    /**
     * Wraps address validation parameters and ensures the "name" field exists.
     * If not present, generates a UUID (with hyphens removed) as the name.
     * @private
     * @param {Object} params - The original parameters map.
     * @returns {Object} - A new map with properly wrapped address_validation and easypost_details.
     */
    _wrapAddressValidation(params: FedExParams): Record<string, unknown>;
    /**
     * Wraps PIN validation parameters and ensures the "name" field exists.
     * If not present, generates a UUID (with hyphens removed) as the name.
     * @private
     * @param {Object} params - The original parameters map.
     * @returns {Object} - A new map with properly wrapped pin_validation and easypost_details.
     */
    _wrapPinValidation(params: FedExParams): Record<string, unknown>;
    /**
     * Wraps invoice validation parameters and ensures the "name" field exists.
     * If not present, generates a UUID (with hyphens removed) as the name.
     * @private
     * @param {Object} params - The original parameters map.
     * @returns {Object} - A new map with properly wrapped invoice_validation and easypost_details.
     */
    _wrapInvoiceValidation(params: FedExParams): Record<string, unknown>;
    /**
     * Ensures the "name" field exists in the provided map.
     * If not present, generates a UUID (with hyphens removed) as the name.
     * This follows the pattern used in the web UI implementation.
     * @private
     * @param {Object} map - The map to ensure the "name" field in.
     */
    _ensureNameField(map: FedExValidationMap): void;
    _toPlainEasyPostObject(response: any): any;
    _buildEasyPostObject(response: any, params: any): any;
    _convertToEasyPostObject(response: any, params?: any): any;
    _create(url: any, params: any): Promise<any>;
    _all(url: any, params?: {}): Promise<any>;
    _retrieve(url: any): Promise<any>;
    _getNextPage(url: string, key: string, collection: any, pageSize?: number | null, optionalParams?: any): Promise<any>;
};
export default _default;
