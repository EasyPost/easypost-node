type PickupParams = Record<string, unknown>;
type PickupCollection = Record<string, unknown>;
declare const _default: (easypostClient: any) => {
    new (): {};
    /**
     * Create a {@link Pickup pickup}.
     * See {@link https://docs.easypost.com/docs/pickups#create-a-pickup EasyPost API Documentation} for more information.
     * @param {Object} params - The parameters to create a pickup with.
     * @returns {Pickup} - The created pickup.
     */
    create(params: PickupParams): Promise<unknown>;
    /**
     * Purchase a {@link Pickup pickup}.
     * See {@link https://docs.easypost.com/docs/pickups#buy-a-pickup EasyPost API Documentation} for more information.
     * @param {string} id - The ID of the pickup to purchase.
     * @param {string} carrier - The carrier to purchase the pickup with.
     * @param {string} service - The service to purchase the pickup with.
     * @returns {Pickup} - The purchased pickup.
     */
    buy(id: string, carrier: string, service: string): Promise<unknown>;
    /**
     * Cancel a {@link Pickup pickup}.
     * See {@link https://docs.easypost.com/docs/pickups#cancel-a-pickup EasyPost API Documentation} for more information.
     * @param {string} id - The ID of the pickup to cancel.
     * @returns {Pickup} - The cancelled pickup.
     */
    cancel(id: string): Promise<unknown>;
    /**
     * Retrieve all {@link Pickup pickups} associated with the current authenticated user.
     * See {@link https://docs.easypost.com/docs/pickups#retrieve-all-pickups EasyPost API Documentation} for more information.
     * @param {Object} [params] - The parameters to filter the pickups by.
     * @returns {Object} - An object containing a list of {@link Pickup pickups} and pagination information.
     */
    all(params?: Record<string, unknown>): Promise<unknown>;
    /**
     * Retrieve the next page of Pickup collection.
     * @param {Object} pickups An object containing a list of {@link Pickup pickups} and pagination information.
     * @param {Number} pageSize The number of records to return on each page
     * @returns {EasyPostObject|Promise<never>} The retrieved {@link EasyPostObject}-based class instance, or a `Promise` that rejects with an error.
     */
    getNextPage(pickups: PickupCollection, pageSize?: number | null): Promise<unknown>;
    /**
     * Retrieve a {@link Pickup pickup} by its ID.
     * See {@link https://docs.easypost.com/docs/pickups#retrieve-a-pickup EasyPost API Documentation} for more information.
     * @param {string} id - The ID of the pickup to retrieve.
     * @returns {Pickup} - The retrieved pickup.
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
