import baseService from './base_service';

export default (easypostClient) =>
    /**
     * The InsuranceService class provides methods for interacting with EasyPost Insurance objects.
     * @param {EasyPostClient} easypostClient - The pre-configured EasyPostClient instance to use for API requests with this service.
     */
    class InsuranceService extends baseService(easypostClient) {
        /**
         * The {@link EasyPostObject} class associated with this service.
         * @override
         * @type {string}
         */
        static #name = 'Insurance';

        /**
         * The EasyPost API endpoint associated with this service.
         * @override
         * @type {string}
         */
        static #url = 'insurances';

        /**
         * The top-level JSON key associated with this service.
         * @override
         * @type {string}
         */
        static #key = 'insurance';

        /**
         * Create insurance.
         * @param {*} params
         * @returns {Insurance}
         */
        static async create(params) {
            const url = this.#url;

            const wrappedParams = {};
            wrappedParams[this.#key] = params;

            return this._create(url, wrappedParams);
        }

        /**
         * Retrieve a list of all insurances associated with the API key.
         * @param {Object} [params]
         * @returns {Insurance[]}
         */
        static async all(params = {}) {
            const url = this.#url;

            return this._all(url, params);
        }

        /**
         * Retrieve an insurance record from the API.
         * @param {string} id
         * @returns {Insurance}
         */
        static async retrieve(id) {
            const url = `${this.#url}/${id}`;

            return this._retrieve(url);
        }
    };
