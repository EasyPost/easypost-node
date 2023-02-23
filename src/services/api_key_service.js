import baseService from './base_service';

export default (easypostClient) =>
    class ApiKeyService extends baseService(easypostClient) {
        /**
         * The {@link EasyPostObject} class associated with this service.
         * @override
         * @type {string}
         */
        static #name = 'ApiKey';

        /**
         * The EasyPost API endpoint associated with this service.
         * @override
         * @type {string}
         */
        static #url = 'api_keys';

        /**
         * Retrieve a list of all API keys associated with the API key.
         * @param {Object} [params]
         * @returns {ApiKey[]}
         */
        static async all(params = {}) {
            const url = this.#url;

            return this._all(url, params);
        }
    };
