type OrderParams = Record<string, unknown>;
declare const _default: (easypostClient: any) => {
    new (): {};
    /**
     * Create an {@link Order order}.
     * See {@link https://docs.easypost.com/docs/orders#create-an-order EasyPost API Documentation} for more information.
     * @param {Object} params - The parameters to create an order with.
     * @returns {Order} - The created order.
     */
    create(params: OrderParams): Promise<unknown>;
    /**
     * Purchase an {@link Order order}.
     * See {@link https://docs.easypost.com/docs/orders#buy-an-order EasyPost API Documentation} for more information.
     * @param {string} id - The ID of the order to buy.
     * @param {string} carrier - The carrier to use for the order purchase.
     * @param {string} service - The service to use for the order purchase.
     * @returns {Order} - The purchased order.
     */
    buy(id: string, carrier: string, service: string): Promise<unknown>;
    /**
     * Get updated rates for an {@link Order order}.
     * See {@link https://docs.easypost.com/docs/orders EasyPost API Documentation} for more information.
     * @param {string} id - The ID of the order to get rates for.
     * @returns {Order} - The order with rates.
     */
    getRates(id: string): Promise<unknown>;
    /**
     * Retrieve an {@link Order order} by its ID.
     * See {@link https://docs.easypost.com/docs/orders#retrieve-an-order EasyPost API Documentation} for more information.
     * @param {string} id - The ID of the order to retrieve.
     * @returns {Order} - The retrieved order.
     */
    retrieve(id: string): Promise<unknown>;
    _toPlainEasyPostObject(response: any): any;
    _buildEasyPostObject(response: any, params: any): any;
    _convertToEasyPostObject(response: any, params?: any): any;
    _create(url: any, params: any): Promise<any>;
    _all(url: any, params?: {}): Promise<any>;
    _retrieve(url: any): Promise<any>;
    _getNextPage(url: string, key: string, collection: any, pageSize?: number | null, optionalParams?: any): Promise<any>;
};
export default _default;
