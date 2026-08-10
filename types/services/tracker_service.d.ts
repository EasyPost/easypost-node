type TrackerParams = Record<string, unknown>;
type TrackerCollection = Record<string, unknown>;
declare const _default: (easypostClient: any) => {
    new (): {};
    /**
     * Create a {@link Tracker tracker}.
     * See {@link https://docs.easypost.com/docs/trackers#create-a-tracker EasyPost API Documentation} for more information.
     * @param {Object} params - The parameters to create a tracker with.
     * @returns {Tracker} - The created tracker.
     */
    create(params: TrackerParams): Promise<unknown>;
    /**
     * Retrieve all {@link Tracker trackers} associated with the current authenticated user.
     * See {@link https://docs.easypost.com/docs/trackers#retrieve-all-trackers EasyPost API Documentation} for more information.
     * @param {Object} [params] - The parameters to filter the trackers by.
     * @returns {Object} - An object containing the list of {@link Tracker trackers} and pagination information.
     */
    all(params?: Record<string, unknown>): Promise<unknown>;
    /**
     * Retrieve the next page of Tracker collection.
     * @param {Object} trackers An object containing a list of {@link Tracker trackers} and pagination information.
     * @param {Number} pageSize The number of records to return on each page
     * @returns {EasyPostObject|Promise<never>} The retrieved {@link EasyPostObject}-based class instance, or a `Promise` that rejects with an error.
     */
    getNextPage(trackers: TrackerCollection, pageSize?: number | null): Promise<unknown>;
    /**
     * Retrieve a {@link Tracker tracker} by its ID.
     * See {@link https://docs.easypost.com/docs/trackers#retrieve-a-tracker EasyPost API Documentation} for more information.
     * @param {string} id - The ID of the tracker to retrieve.
     * @returns {Tracker} - The retrieved tracker.
     */
    retrieve(id: string): Promise<unknown>;
    /**
     * Retrieve a batch of {@link Tracker trackers}.
     * @param {Object} [params] - The parameters to filter the trackers by.
     * @returns {Object} - An object containing the list of {@link Tracker trackers}.
     */
    retrieveBatch(params?: Record<string, unknown>): Promise<unknown>;
    /**
     * Delete a {@link Tracker tracker}.
     * See {@link https://docs.easypost.com/docs/trackers#delete-a-tracker EasyPost API Documentation} for more information.
     * @param {string} id - The ID of the tracker to delete.
     * @returns {Promise<void>}
     */
    delete(id: string): Promise<void>;
    _toPlainEasyPostObject(response: any): any;
    _buildEasyPostObject(response: any, params: any): any;
    _convertToEasyPostObject(response: any, params?: any): any;
    _create(url: any, params: any): Promise<any>;
    _all(url: any, params?: {}): Promise<any>;
    _retrieve(url: any): Promise<any>;
    _getNextPage(url: string, key: string, collection: any, pageSize?: number | null, optionalParams?: any): Promise<any>;
};
export default _default;
