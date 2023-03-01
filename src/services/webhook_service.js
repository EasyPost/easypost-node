import baseService from './base_service';

export default (easypostClient) =>
  /**
   * The WebhookService class provides methods for interacting with EasyPost {@link Webhook} objects.
   * @param {EasyPostClient} easypostClient - The pre-configured EasyPostClient instance to use for API requests with this service.
   */
  class WebhookService extends baseService(easypostClient) {
    /**
     * Create a {@link Webhook webhook}.
     * See {@link https://www.easypost.com/docs/api/node#create-a-webhook EasyPost API Documentation} for more information.
     * @param {Object} params - The parameters to create a webhook with.
     * @returns {Webhook} - The created webhook.
     */
    static async create(params) {
      const url = 'webhooks';

      const wrappedParams = {
        webhook: params,
      };

      return this._create(url, wrappedParams);
    }

    /**
     * Update a {@link Webhook webhook}.
     * A disabled webhook will be re-enabled if it is updated.
     * See {@link https://www.easypost.com/docs/api/node#update-a-webhook EasyPost API Documentation} for more information.
     * @param {string} id - The ID of the webhook to update.
     * @param {Object} params - The parameters to update the webhook with.
     * @returns {Webhook} - The updated webhook.
     */
    static async update(id, params) {
      const url = `webhooks/${id}`;
      try {
        const response = await easypostClient._patch(url, params);

        return this._convertToEasyPostObject(response.body);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Delete a {@link Webhook webhook}.
     * See {@link https://www.easypost.com/docs/api/node#delete-a-webhook EasyPost API Documentation} for more information.
     * @param {string} id - The ID of the webhook to delete.
     * @returns {Promise|Promise<never>} - A promise that resolves if the webhook was successfully deleted.
     */
    static async delete(id) {
      const url = `webhooks/${id}`;

      try {
        await easypostClient._delete(url);

        return Promise.resolve();
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Retrieve all {@link Webhook webhooks} associated with the current authenticated user.
     * See {@link https://www.easypost.com/docs/api/node#list-a-webhooks EasyPost API Documentation} for more information.
     * @param {Object} [params]
     * @returns {Webhook[]}
     */
    static async all(params = {}) {
      const url = 'webhooks';

      return this._all(url, params);
    }

    /**
     * Retrieve a {@link Webhook webhook} by its ID.
     * See {@link https://www.easypost.com/docs/api/node#retrieve-a-webhook EasyPost API Documentation} for more information.
     * @param {string} id - The ID of the webhook to retrieve.
     * @returns {Webhook} - The retrieved webhook.
     */
    static async retrieve(id) {
      const url = `webhooks/${id}`;

      return this._retrieve(url);
    }
  };
