import EasyPost from "../..";
import baseService from "../base_service";
import { IWebhook } from "./Webhook";
import { IWebhookCreateParameters } from "./WebhookCreateParameters";
import { IWebhookListParameters } from "./WebhookListParameters";

export * from "./Webhook";
export * from "./WebhookCreateParameters";
export * from "./WebhookListParameters";

export default (easypostClient: EasyPost) =>
  /**
   * The WebhookService class provides methods for interacting with EasyPost {@link Webhook} objects.
   * @param {EasyPostClient} easypostClient - The pre-configured EasyPostClient instance to use for API requests with this service.
   */
  class WebhookService extends baseService(easypostClient) {
    /**
     * Create a {@link Webhook webhook}.
     * See {@link https://www.easypost.com/docs/api/node#create-a-webhook EasyPost API Documentation} for more information.
     * @param params - The parameters to create a webhook with.
     * @returns - The created webhook.
     */
    static async create(params: IWebhookCreateParameters) {
      const url = "webhooks";

      const wrappedParams = {
        webhook: params,
      };

      return this._create<IWebhook>(url, wrappedParams);
    }

    /**
     * Update a {@link Webhook webhook}.
     * A disabled webhook will be re-enabled if it is updated.
     * See {@link https://www.easypost.com/docs/api/node#update-a-webhook EasyPost API Documentation} for more information.
     * @param id - The ID of the webhook to update.
     * @param params - The parameters to update the webhook with.
     * @returns - The updated webhook.
     */
    static async update(id: string, params: Partial<IWebhookCreateParameters>) {
      const url = `webhooks/${id}`;
      try {
        const response = await easypostClient._patch(url, params);

        return this._convertToEasyPostObject<IWebhook>(response.body, params);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Delete a {@link Webhook webhook}.
     * See {@link https://www.easypost.com/docs/api/node#delete-a-webhook EasyPost API Documentation} for more information.
     * @param id - The ID of the webhook to delete.
     * @returns - A promise that resolves if the webhook was successfully deleted.
     */
    static async delete(id: string) {
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
     * @param [params]
     * @returns
     */
    static async all(params: IWebhookListParameters = {}) {
      const url = "webhooks";

      return this._all<{ webhooks: IWebhook[] }>(url, params);
    }

    /**
     * Retrieve a {@link Webhook webhook} by its ID.
     * See {@link https://www.easypost.com/docs/api/node#retrieve-a-webhook EasyPost API Documentation} for more information.
     * @param id - The ID of the webhook to retrieve.
     * @returns - The retrieved webhook.
     */
    static async retrieve(id: string) {
      const url = `webhooks/${id}`;

      return this._retrieve<IWebhook>(url);
    }
  };
