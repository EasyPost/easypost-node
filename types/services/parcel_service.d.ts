type ParcelParams = Record<string, unknown>;
declare const _default: (easypostClient: any) => {
    new (): {};
    /**
     * Create a {@link Parcel parcel}.
     * See {@link https://docs.easypost.com/docs/parcels#create-a-parcel EasyPost API Documentation} for more information.
     * @param {Object} params - The parameters to create a parcel with.
     * @returns {Parcel} - The created parcel.
     */
    create(params: ParcelParams): Promise<unknown>;
    /**
     * Retrieve a {@link Parcel parcel} by its ID.
     * See {@link https://docs.easypost.com/docs/parcels#retrieve-a-parcel EasyPost API Documentation} for more information.
     * @param {string} id - The ID of the parcel to retrieve.
     * @returns {Parcel} - The retrieved parcel.
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
