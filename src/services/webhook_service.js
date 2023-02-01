import baseService from './base_service';

export default (easypostClient) =>
  class WebhookService extends baseService(easypostClient) {
    static _name = 'Webhook';

    static _url = 'webhooks';

    static key = 'webhook';

    /**
     * Update a Webhook.
     * @param {string} id
     * @param {object} params
     * @returns {User}
     */
    static async update(id, params) {
      try {
        const response = await easypostClient.patch(`${this._url}/${id}`, {
          user: params,
        });

        return this.convertToEasyPostObject(response.body);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Delete a Webhook.
     * @param {string} id
     * @returns {Promise|Promise<never>}
     */
    static async delete(id) {
      try {
        await easypostClient.del(`${this._url}/${id}`);
        return Promise.resolve();
      } catch (e) {
        return Promise.reject(e);
      }
    }
  };
