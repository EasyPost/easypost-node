type WebhookParams = Record<string, unknown>;
declare const _default: (easypostClient: any) => {
    new (): {};
    /**
     * Create a {@link Webhook webhook}.
     * See {@link https://docs.easypost.com/docs/webhooks#create-a-webhook EasyPost API Documentation} for more information.
     * @param {Object} params - The parameters to create a webhook with.
     * @returns {Webhook} - The created webhook.
     */
    create(params: WebhookParams): Promise<unknown>;
    /**
     * Update a {@link Webhook webhook}.
     * A disabled webhook will be re-enabled if it is updated.
     * See {@link https://docs.easypost.com/docs/webhooks#update-a-webhook EasyPost API Documentation} for more information.
     * @param {string} id - The ID of the webhook to update.
     * @param {Object} params - The parameters to update the webhook with.
     * @returns {Webhook} - The updated webhook.
     */
    update(id: string, params: Record<string, unknown>): Promise<unknown>;
    /**
     * Delete a {@link Webhook webhook}.
     * See {@link https://docs.easypost.com/docs/webhooks#delete-a-webhook EasyPost API Documentation} for more information.
     * @param {string} id - The ID of the webhook to delete.
     * @returns {Promise|Promise<never>} - A promise that resolves if the webhook was successfully deleted.
     */
    delete(id: string): Promise<void>;
    /**
     * Retrieve all {@link Webhook webhooks} associated with the current authenticated user.
     * See {@link https://docs.easypost.com/docs/webhooks#retrieve-all-webhooks EasyPost API Documentation} for more information.
     * @param {Object} [params]
     * @returns {Webhook[]}
     */
    all(params?: Record<string, unknown>): Promise<unknown>;
    /**
     * Retrieve a {@link Webhook webhook} by its ID.
     * See {@link https://docs.easypost.com/docs/webhooks#retrieve-a-webhook EasyPost API Documentation} for more information.
     * @param {string} id - The ID of the webhook to retrieve.
     * @returns {Webhook} - The retrieved webhook.
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
