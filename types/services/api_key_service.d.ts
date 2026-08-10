declare const _default: (easypostClient: any) => {
    new (): {};
    /**
     * Retrieve API Keys for a specified {@link User user}.
     * See {@link https://docs.easypost.com/docs/api-keys#retrieve-an-api-key EasyPost API Documentation} for more information.
     * @param {string} id - The ID of the user to retrieve keys for.
     * @returns {Array} - List of associated API Keys.
     * @throws {FilteringError} If user or API Keys are not found.
     */
    retrieveApiKeysForUser(id: string): Promise<unknown[]>;
    /**
     * Retrieve all {@link ApiKey API keys} associated with the current authenticated user.
     * See {@link https://docs.easypost.com/docs/api-keys#retrieve-an-api-key EasyPost API Documentation} for more information.
     * @returns {Object} - An object containing the API keys associated with the current authenticated user and its child users.
     */
    all(params?: Record<string, unknown>): Promise<unknown>;
    /**
     * Create an API key for a child or referral customer user.
     * See {@link https://docs.easypost.com/docs/api-keys#create-an-api-key EasyPost API Documentation} for more information.
     * @param {string} mode - The mode for the API key (either "production" or "test").
     * @returns {ApiKey} - The created API key.
     */
    create(mode: string): Promise<unknown>;
    /**
     * Delete an API key for a child or referral customer user.
     * See {@link https://docs.easypost.com/docs/api-keys#delete-an-api-key EasyPost API Documentation} for more information.
     * @param {string} id - The ID of the API key to delete.
     * @returns {Promise|Promise<never>} - A promise that resolves if the API key was successfully deleted.
     */
    delete(id: string): Promise<void>;
    /**
     * Enable a child or referral customer API key.
     * See {@link https://docs.easypost.com/docs/api-keys#enable-an-api-key EasyPost API Documentation} for more information.
     * @param {string} id - The ID of the API key to enable.
     * @returns {ApiKey} - The enabled API key.
     */
    enable(id: string): Promise<unknown>;
    /**
     * Disable a child or referral customer API key.
     * See {@link https://docs.easypost.com/docs/api-keys#disable-an-api-key EasyPost API Documentation} for more information.
     * @param {string} id - The ID of the API key to disable.
     * @returns {ApiKey} - The disabled API key.
     */
    disable(id: string): Promise<unknown>;
    _toPlainEasyPostObject(response: any): any;
    _buildEasyPostObject(response: any, params: any): any;
    _convertToEasyPostObject(response: any, params?: any): any;
    _create(url: any, params: any): Promise<any>;
    _all(url: any, params?: {}): Promise<any>;
    _retrieve(url: any): Promise<any>;
    _getNextPage(url: string, key: string, collection: any, pageSize?: number | null, optionalParams?: any): Promise<any>;
};
export default _default;
