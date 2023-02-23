import baseService from './base_service';

export default (easypostClient) =>
    class OrderService extends baseService(easypostClient) {
        /**
         * The {@link EasyPostObject} class associated with this service.
         * @override
         * @type {string}
         */
        static #name = 'Order';

        /**
         * The EasyPost API endpoint associated with this service.
         * @override
         * @type {string}
         */
        static #url = 'orders';

        /**
         * The top-level JSON key associated with this service.
         * @override
         * @type {string}
         */
        static #key = 'order';

        /**
         * Create an order.
         * @param {*} params
         * @returns {Order}
         */
        static async create(params) {
            const url = this.#url;

            const wrappedParams = {};
            wrappedParams[this.#key] = params;

            return this._create(url, wrappedParams);
        }

        /**
         * Buy an order.
         * @param {string} id
         * @param {string} carrier
         * @param {string} service
         * @returns {Order}
         */
        static async buy(id, carrier, service) {
            const url = `${this.#url}/${id}/buy`;
            const wrappedParams = {carrier, service};
            try {
                const response = await easypostClient._post(url, wrappedParams);

                return this._convertToEasyPostObject(response.body);
            } catch (e) {
                return Promise.reject(e);
            }
        }

        /**
         * Get the rates of an order.
         * @param {string} id
         * @returns {Order}
         */
        static async getRates(id) {
            const url = `${this.#url}/${id}/rates`;

            try {
                const response = await easypostClient._get(url);

                return this._convertToEasyPostObject(response.body);
            } catch (e) {
                return Promise.reject(e);
            }
        }

        /**
         * Retrieve an order from the API.
         * @param {string} id
         * @returns {Order}
         */
        static async retrieve(id) {
            const url = `${this.#url}/${id}`;

            return this._retrieve(url);
        }
    };
