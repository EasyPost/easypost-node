import baseService from './base_service';

export default (easypostClient) =>
    class RefundService extends baseService(easypostClient) {
        /**
         * The {@link EasyPostObject} class associated with this service.
         * @override
         * @type {string}
         */
        static #name = 'Refund';

        /**
         * The EasyPost API endpoint associated with this service.
         * @override
         * @type {string}
         */
        static #url = 'refunds';

        /**
         * The top-level JSON key associated with this service.
         * @override
         * @type {string}
         */
        static #key = 'refund';

        /**
         * Create a refund.
         * @param {*} params
         * @returns {Refund}
         */
        static async create(params) {
            const url = this.#url;

            const wrappedParams = {};
            wrappedParams[this.#key] = params;

            return this._create(url, wrappedParams);
        }

        /**
         * Retrieve a list of all refunds associated with the API key.
         * @param {Object} [params]
         * @returns {Refund[]}
         */
        static async all(params = {}) {
            const url = this.#url;

            return this._all(url, params);
        }

        /**
         * Retrieve a refund from the API.
         * @param {string} id
         * @returns {Refund}
         */
        static async retrieve(id) {
            const url = `${this.#url}/${id}`;

            return this._retrieve(url);
        }
    };
