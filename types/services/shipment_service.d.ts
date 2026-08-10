type ShipmentParams = Record<string, unknown>;
type ShipmentRateInput = string | {
    id: string;
};
type ShipmentCollection = Record<string, unknown>;
declare const _default: (easypostClient: any) => {
    new (): {};
    /**
     * Create a {@link Shipment shipment}.
     * See {@link https://docs.easypost.com/docs/shipments#create-a-shipment EasyPost API Documentation} for more information.
     * @param {Object} params - The parameters to create a shipment with.
     * @returns {Shipment} - The created shipment.
     */
    create(params: ShipmentParams): Promise<unknown>;
    /**
     * Purchase a {@link Shipment shipment}.
     * See {@link https://docs.easypost.com/docs/shipments#buy-a-shipment EasyPost API Documentation} for more information.
     * @param {string} id - The ID of the shipment to purchase.
     * @param {Rate} rate - The rate to purchase the shipment with.
     * @param {number|null} [insuranceAmount] - The amount of insurance to purchase for the shipment.
     * @param {string|null} [endShipperId] - The ID of the end shipper to purchase the shipment with.
     * @returns {Shipment} - The purchased shipment.
     */
    buy(id: string, rate: ShipmentRateInput, insuranceAmount?: number | null, endShipperId?: string | null): Promise<unknown>;
    /**
     * Convert the label format of a {@link Shipment shipment}.
     * See {@link https://docs.easypost.com/docs/shipments#converting-the-label-format-of-a-shipment EasyPost API Documentation} for more information.
     * @param {string} id - The ID of the shipment to convert the label format of.
     * @param {string} format - The format to convert the label to.
     * @returns {Shipment} - The shipment with the converted label format.
     */
    convertLabelFormat(id: string, format: string): Promise<unknown>;
    /**
     * Regenerate {@link Rate rates} for a {@link Shipment shipment}.
     * See {@link https://docs.easypost.com/docs/shipments/rates#regenerate-rates-for-a-shipment EasyPost API Documentation} for more information.
     * @param {string} id - The ID of the shipment to regenerate rates for.
     * @returns {Shipment} - The shipment with regenerated rates.
     */
    regenerateRates(id: string): Promise<unknown>;
    /**
     * Get SmartRates for a {@link Shipment shipment}.
     * See {@link https://docs.easypost.com/docs/shipments/shipping-smartrate#shipping-smartrate-1 EasyPost API Documentation} for more information.
     * @param {string} id - The ID of the shipment to get SmartRates for.
     * @returns {Rate[]} - The SmartRates for the shipment.
     */
    getSmartRates(id: string): Promise<unknown>;
    /**
     * Insure a {@link Shipment shipment}.
     * See {@link https://docs.easypost.com/docs/shipments/shipping-insurance#insure-a-shipment EasyPost API Documentation} for more information.
     * @param {string} id - The ID of the shipment to insure.
     * @param {number|string} amount - The amount to insure the shipment for.
     * @returns {Shipment} - The insured shipment.
     */
    insure(id: string, amount: number | string): Promise<unknown>;
    /**
     * Generate a form for a {@link Shipment shipment}.
     * See {@link https://docs.easypost.com/docs/shipments/forms#create-form EasyPost API Documentation} for more information.
     * @param {string} id - The ID of the shipment to generate a form for.
     * @param {string} formType - The type of form to generate.
     * @param {Map} [formOptions] - Options for the form.
     * @returns {Shipment} - The shipment with the generated form attached.
     */
    generateForm(id: string, formType: string, formOptions?: Record<string, unknown>): Promise<unknown>;
    /**
     * Refund a {@link Shipment shipment}.
     * See {@link https://docs.easypost.com/docs/shipments/shipping-refund#refund-a-shipment EasyPost API Documentation} for more information.
     * @param {string} id - The ID of the shipment to refund.
     * @returns {Shipment} - The refunded shipment.
     */
    refund(id: string): Promise<unknown>;
    /**
     * Get the lowest SmartRate of a shipment.
     * @param {string} id - The ID of the shipment to get the lowest SmartRate of.
     * @param {number} deliveryDays - The number of days the shipment will take to deliver.
     * @param {string} deliveryAccuracy - The accuracy of the delivery days.
     * @returns {Rate} - The lowest SmartRate of the shipment.
     */
    lowestSmartRate(id: string, deliveryDays: number, deliveryAccuracy: string): Promise<unknown>;
    /**
     * Retrieve all {@link Shipment shipments} associated with the current authenticated user.
     * See {@link https://docs.easypost.com/docs/shipments#retrieve-all-shipments EasyPost API Documentation} for more information.
     * @param {Object} [params] - Parameters to filter the shipments by.
     * @returns {Object} - An object containing a list of {@link Shipment shipments} and pagination information.
     */
    all(params?: Record<string, unknown>): Promise<unknown>;
    /**
     * Retrieve the next page of Shipment collection.
     * @param {Object} shipments An object containing a list of {@link Shipment shipments} and pagination information.
     * @param {Number} pageSize The number of records to return on each page
     * @returns {EasyPostObject|Promise<never>} The retrieved {@link EasyPostObject}-based class instance, or a `Promise` that rejects with an error.
     */
    getNextPage(shipments: ShipmentCollection, pageSize?: number): Promise<unknown>;
    /**
     * Retrieve a {@link Shipment shipment} by its ID.
     * See {@link https://docs.easypost.com/docs/shipments#retrieve-a-shipment EasyPost API Documentation} for more information.
     * @param {string} id - The ID of the shipment to retrieve.
     * @returns {Shipment} - The shipment with the given ID.
     */
    retrieve(id: string): Promise<unknown>;
    /**
     * Retrieve the estimated delivery date of each Rate via SmartRate.
     * @param {string} id - The ID of the shipment to retrieve the estimated delivery date for.
     * @param {string} plannedShipDate - The planned ship date of the shipment.
     * @returns {Array} - An array of the estimated delivery date and rates.
     */
    retrieveEstimatedDeliveryDate(id: string, plannedShipDate: string): Promise<unknown>;
    /**
     * Retrieve a recommended ship date for a {@link Shipment shipment} via the Precision Shipping API, based on a specific desired delivery date.
     * @param id - The ID of the shipment to retrieve the recommended ship date for.
     * @param desiredDeliveryDate - The desired delivery date for the shipment.
     * @returns {Array} - An array of the recommended ship date and rates.
     */
    recommendShipDate(id: string, desiredDeliveryDate: string): Promise<unknown>;
    /**
     * Create and buy a Luma Shipment in one call.
     * @param {Object} params - The parameters to create and buy a Shipment with Luma.
     * @returns {Shipment} - The shipment with the given ID.
     */
    createAndBuyLuma(params: ShipmentParams): Promise<unknown>;
    /**
     * Buy a Shipment with Luma.
     * @param {string} id - The ID of the Shipment to buy with Luma.
     * @param {Object} params - The parameters to buy a Shipment with Luma.
     * @returns {Shipment} - The shipment with the given ID.
     */
    buyLuma(id: string, params: Record<string, unknown>): Promise<unknown>;
    _toPlainEasyPostObject(response: any): any;
    _buildEasyPostObject(response: any, params: any): any;
    _convertToEasyPostObject(response: any, params?: any): any;
    _create(url: any, params: any): Promise<any>;
    _all(url: any, params?: {}): Promise<any>;
    _retrieve(url: any): Promise<any>;
    _getNextPage(url: string, key: string, collection: any, pageSize?: number | null, optionalParams?: any): Promise<any>;
};
export default _default;
