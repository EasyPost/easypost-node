import baseService from './base_service';

export default (easypostClient) =>
    /**
     * The CustomsInfoService class provides methods for interacting with EasyPost CustomsInfo objects.
     * @param {EasyPostClient} easypostClient - The pre-configured EasyPostClient instance to use for API requests with this service.
     */
    class CustomsInfoService extends baseService(easypostClient) {
        /**
         * The {@link EasyPostObject} class associated with this service.
         * @override
         * @type {string}
         */
        static #name = 'CustomsInfo';

        /**
         * The EasyPost API endpoint associated with this service.
         * @override
         * @type {string}
         */
        static #url = 'customs_infos';

        /**
         * The top-level JSON key associated with this service.
         * @override
         * @type {string}
         */
        static #key = 'customs_info';

        /**
         * Create a customs info record.
         * @param {*} params
         * @returns {CustomsInfo}
         */
        static async create(params) {
            const url = this.#url;

            const wrappedParams = {};
            wrappedParams[this.#key] = params;

            return this._create(url, wrappedParams);
        }

        /**
         * Retrieve a customs info record from the API.
         * @param {string} id
         * @returns {CustomsInfo}
         */
        static async retrieve(id) {
            const url = `${this.#url}/${id}`;

            return this._retrieve(url);
        }
    };
