import baseService from './base_service';

export default (easypostClient) =>
    /**
     * The WebhookService class provides methods for interacting with EasyPost Webhook objects.
     * @param {EasyPostClient} easypostClient - The pre-configured EasyPostClient instance to use for API requests with this service.
     */
    class WebhookService extends baseService(easypostClient) {
        /**
         * The {@link EasyPostObject} class associated with this service.
         * @override
         * @type {string}
         */
        static #name = 'Webhook';

        /**
         * The EasyPost API endpoint associated with this service.
         * @override
         * @type {string}
         */
        static #url = 'webhooks';

        /**
         * The top-level JSON key associated with this service.
         * @override
         * @type {string}
         */
        static #key = 'webhook';

        /**
         * Create a webhook.
         * @param {*} params
         * @returns {Webhook}
         */
        static async create(params) {
            const url = this.#url;

            const wrappedParams = {};
            wrappedParams[this.#key] = params;

            return this._create(url, wrappedParams);
        }

        /**
         * Update a Webhook.
         * @param {string} id
         * @param {Object} params
         * @returns {User}
         */
        static async update(id, params) {
            const url = `${this.#url}/${id}`;
            const wrappedParams = {
                user: params,
            };

            try {
                const response = await easypostClient._patch(url, wrappedParams);

                return this._convertToEasyPostObject(response.body);
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
            const url = `${this.#url}/${id}`;

            try {
                await easypostClient._delete(url);

                return Promise.resolve();
            } catch (e) {
                return Promise.reject(e);
            }
        }

        /**
         * Retrieve a list of all webhooks associated with the API key.
         * @param {Object} [params]
         * @returns {Webhook[]}
         */
        static async all(params = {}) {
            const url = this.#url;

            return this._all(url, params);
        }

        /**
         * Retrieve a webhook from the API.
         * @param {string} id
         * @returns {Webhook}
         */
        static async retrieve(id) {
            const url = `${this.#url}/${id}`;

            return this._retrieve(url);
        }
    };
