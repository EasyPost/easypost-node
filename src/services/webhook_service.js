import baseService from './base_service';

export default (easypostClient) =>
  class WebhookService extends baseService(easypostClient) {
    static _name = 'Webhook';

    static _url = 'webhooks';

    static key = 'webhook';

    /**
     * Create a webhook.
     * @param {*} params
     * @returns {Webhook}
     */
    static async create(params) {
      const url = this._url;

      const wrappedParams = {};
      wrappedParams[this.key] = params;

      return this._create(url, wrappedParams);
    }

    /**
     * Update a Webhook.
     * @param {string} id
     * @param {object} params
     * @returns {User}
     */
    static async update(id, params) {
      const url = `${this._url}/${id}`;
      const wrappedParams = {
        user: params,
      };

      try {
        const response = await easypostClient.patch(url, wrappedParams);

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
      const url = `${this._url}/${id}`;

      try {
        await easypostClient.del(url);

        return Promise.resolve();
      } catch (e) {
        return Promise.reject(e);
      }
    }

    /**
     * Retrieve a list of all webhooks associated with the API key.
     * @param {object} params
     * @returns {Webhook[]}
     */
    static async all(params = {}) {
      const url = this._url;

      return this._all(url, params);
    }

    /**
     * Retrieve a webhook from the API.
     * @param {string} id
     * @returns {Webhook}
     */
    static async retrieve(id) {
      const url = `${this._url}/${id}`;

      return this._retrieve(url);
    }
  };
