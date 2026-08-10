type EventCollection = Record<string, unknown>;
declare const _default: (easypostClient: any) => {
    new (): {};
    /**
     * Retrieve all {@link Payload payloads} for an {@link Event event}.
     * See {@link https://docs.easypost.com/docs/events/payloads#retrieve-all-payloads EasyPost API Documentation} for more information.
     * @param {string} id - The ID of the event to retrieve payloads for.
     * @returns {Payload[]} - A list of {@link Payload payloads} for the event.
     */
    retrieveAllPayloads(id: string): Promise<unknown>;
    /**
     * Retrieve a specific {@link Payload payload} for an {@link Event event}.
     * See {@link https://docs.easypost.com/docs/events/payloads#retrieve-a-payload EasyPost API Documentation} for more information.
     * @param {string} id - The ID of the event to retrieve the payload for.
     * @param {string} payloadId - The ID of the payload to retrieve.
     * @returns {Payload} - The {@link Payload payload} for the event.
     */
    retrievePayload(id: string, payloadId: string): Promise<unknown>;
    /**
     * Retrieve all {@link Event events} associated with the current authenticated user.
     * See {@link https://docs.easypost.com/docs/events#retrieve-all-events EasyPost API Documentation} for more information.
     * @param {Object} [params] - Parameters to filter the list of events.
     * @returns {Object} - An object containing the list of {@link Event events} and pagination information.
     */
    all(params?: Record<string, unknown>): Promise<unknown>;
    /**
     * Retrieve the next page of Event collection.
     * @param {Object} events An object containing a list of {@link Event events} and pagination information.
     * @param {Number} pageSize The number of records to return on each page
     * @returns {EasyPostObject|Promise<never>} The retrieved {@link EasyPostObject}-based class instance, or a `Promise` that rejects with an error.
     */
    getNextPage(events: EventCollection, pageSize?: number | null): Promise<unknown>;
    /**
     * Retrieve an {@link Event event} by its ID.
     * See {@link https://docs.easypost.com/docs/events#retrieve-an-event EasyPost API Documentation} for more information.
     * @param {string} id - The ID of the event to retrieve.
     * @returns {Event} - The retrieved event.
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
