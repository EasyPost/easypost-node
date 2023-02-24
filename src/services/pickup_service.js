import baseService from './base_service';

export default (easypostClient) =>
    /**
     * The PickupService class provides methods for interacting with EasyPost Pickup objects.
     * @param {EasyPostClient} easypostClient - The pre-configured EasyPostClient instance to use for API requests with this service.
     */
    class PickupService extends baseService(easypostClient) {
        /**
         * The {@link EasyPostObject} class associated with this service.
         * @override
         * @type {string}
         */
        static #name = 'Pickup';

        /**
         * The EasyPost API endpoint associated with this service.
         * @override
         * @type {string}
         */
        static #url = 'pickups';

        /**
         * The top-level JSON key associated with this service.
         * @override
         * @type {string}
         */
        static #key = 'pickup';

        /**
         * Create a pickup.
         * @param {*} params
         * @returns {Pickup}
         */
        static async create(params) {
            const url = this.#url;

            const wrappedParams = {};
            wrappedParams[this.#key] = params;

            return this._create(url, wrappedParams);
        }

        /**
         * Buy a pickup.
         * @param {string} id
         * @param {string} carrier
         * @param {string} service
         * @returns {Pickup}
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
         * Cancel a pickup.
         * @param {string} id
         * @returns {Pickup}
         */
        static async cancel(id) {
            const url = `${this.#url}/${id}/cancel`;
            try {
                const response = await easypostClient._post(url);

                return this._convertToEasyPostObject(response.body);
            } catch (e) {
                return Promise.reject(e);
            }
        }

        /**
         * Retrieve a list of all pickups associated with the API key.
         * @param {Object} [params]
         * @returns {Pickup[]}
         */
        static async all(params = {}) {
            const url = this.#url;

            return this._all(url, params);
        }

        /**
         * Retrieve a pickup from the API.
         * @param {string} id
         * @returns {Pickup}
         */
        static async retrieve(id) {
            const url = `${this.#url}/${id}`;

            return this._retrieve(url);
        }
    };
